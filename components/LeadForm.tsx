import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import LeadQuoteFormFields from '@/components/LeadQuoteFormFields';
import {
  emptyLeadQuoteForm,
  submitLeadQuote,
  leadQuoteSubmitErrorMessage,
  type LeadQuoteFormState,
} from '@/lib/leadQuote';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<LeadQuoteFormState>(() => emptyLeadQuoteForm());

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

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setError(null);
      setFormData(emptyLeadQuoteForm());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitLeadQuote(formData, { source: 'website' });
      trackClientEvent(SITE_EVENT.LEAD_SUBMIT_WEBSITE);
      setFormData(emptyLeadQuoteForm());
      setSubmitted(true);
      setTimeout(onClose, 2000);
    } catch (err: unknown) {
      setError(await leadQuoteSubmitErrorMessage(err));
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
              <LeadQuoteFormFields idPrefix="lead" formData={formData} onChange={handleChange} showBookNow />
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
