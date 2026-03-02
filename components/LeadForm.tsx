import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '@/lib/supabase';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carMakeModel: '',
    serviceNotes: '',
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!supabase) {
      setError('Form is not configured. Please add Supabase keys to .env.');
      return;
    }
    setLoading(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('resend-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          car_make_model: formData.carMakeModel || undefined,
          service_notes: formData.serviceNotes || undefined,
        },
      });
      if (fnError) throw fnError;
      const result = data as { ok?: boolean; error?: string } | null;
      if (result?.error) throw new Error(result.error);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', carMakeModel: '', serviceNotes: '' });
      setTimeout(onClose, 2000);
    } catch (err: unknown) {
      let message: string;
      if ((err as { name?: string })?.name === 'FunctionsFetchError') {
        message = 'Could not reach the server. Make sure the resend-email Edge Function is deployed to Supabase (see README).';
      } else if ((err as { name?: string })?.name === 'FunctionsHttpError') {
        const res = (err as { context?: Response })?.context;
        try {
          if (res && typeof res.json === 'function') {
            const body = await res.json() as { error?: string };
            message = body?.error ?? (err instanceof Error ? err.message : 'The server returned an error.');
          } else {
            message = err instanceof Error ? err.message : 'The server returned an error.';
          }
        } catch {
          message = err instanceof Error ? err.message : 'The server returned an error.';
        }
      } else {
        message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="lead-form-title">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative z-10 w-full max-w-lg bg-brand-gray border border-white/10 rounded-lg shadow-2xl overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h3 id="lead-form-title" className="font-display text-xl font-black uppercase text-white">Request a Quote</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/60 hover:text-brand-yellow transition-colors"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <p className="text-red-400 text-sm" role="alert">{error}</p>
          )}
          {submitted ? (
            <p className="text-brand-yellow font-bold text-center py-8">Thanks! We’ll be in touch soon.</p>
          ) : (
            <>
              <div>
                <label htmlFor="lead-name" className="block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Name</label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Email</label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Phone</label>
                <input
                  id="lead-phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none"
                  placeholder="(905) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="lead-car" className="block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Car make / model</label>
                <input
                  id="lead-car"
                  name="carMakeModel"
                  type="text"
                  value={formData.carMakeModel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none"
                  placeholder="e.g. Honda Civic 2022"
                />
              </div>
              <div>
                <label htmlFor="lead-notes" className="block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5">Service notes</label>
                <textarea
                  id="lead-notes"
                  name="serviceNotes"
                  rows={3}
                  value={formData.serviceNotes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none resize-none"
                  placeholder="What service are you interested in? Any details we should know?"
                />
              </div>
              <p className="text-center text-sm text-white/70">
                Already know what you want?{' '}
                <a
                  href="https://detailops.vercel.app/book/showroom-autocare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-yellow hover:underline font-semibold"
                >
                  Book now
                </a>
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-brand-yellow text-brand-black py-4 font-black uppercase tracking-widest text-sm magnetic-cta disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send request'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 border border-white/20 text-white/80 font-bold uppercase tracking-widest text-sm hover:border-brand-yellow hover:text-brand-yellow transition-colors"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modal, document.body) : modal;
};

export default LeadForm;
