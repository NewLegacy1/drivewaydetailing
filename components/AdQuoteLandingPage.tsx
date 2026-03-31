import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadQuoteFormFields from '@/components/LeadQuoteFormFields';
import {
  emptyLeadQuoteForm,
  submitLeadQuote,
  leadQuoteSubmitErrorMessage,
  type LeadQuoteFormState,
} from '@/lib/leadQuote';

/**
 * Paid-ads-only landing: use this URL in Google Ads. Submissions go to /ads/thank-you
 * for conversion tracking; the main site modal does not use that path.
 */
const AdQuoteLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LeadQuoteFormState>(() => emptyLeadQuoteForm());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitLeadQuote(formData);
      setFormData(emptyLeadQuoteForm());
      navigate('/ads/thank-you', { replace: true });
    } catch (err: unknown) {
      setError(await leadQuoteSubmitErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-lg mx-auto">
        <p className="font-display text-brand-yellow text-xs font-black uppercase tracking-[0.25em] text-center mb-3">
          ShowRoom AutoCare
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-white text-center mb-3">
          Get your free quote
        </h1>
        <p className="text-white/65 text-center text-sm md:text-base mb-10 leading-relaxed">
          Mobile detailing and ceramic coating across Hamilton and the GTA. Tell us about your vehicle and we&apos;ll get back to you shortly.
        </p>
        <div className="bg-brand-gray border border-white/10 rounded-lg p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}
            <LeadQuoteFormFields idPrefix="ad" formData={formData} onChange={handleChange} showBookNow />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-yellow text-brand-black py-4 font-black uppercase tracking-widest text-sm magnetic-cta disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Send request'}
            </button>
          </form>
        </div>
        <p className="text-center text-white/45 text-xs mt-8">
          Prefer to call?{' '}
          <a href="tel:+19053794820" className="text-brand-yellow font-semibold hover:underline whitespace-nowrap">
            (905) 379-4820
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdQuoteLandingPage;
