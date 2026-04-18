import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeadQuoteFormFields from '@/components/LeadQuoteFormFields';
import {
  emptyLeadQuoteForm,
  submitLeadQuote,
  leadQuoteSubmitErrorMessage,
  type LeadQuoteFormState,
} from '@/lib/leadQuote';
import { trackMetaLead } from '@/lib/metaPixel';
import { trackClientEvent } from '@/lib/trackEvent';
import { SITE_EVENT } from '@/lib/siteEvents';

type AdLeadFormSectionProps = {
  idPrefix: string;
};

const AdLeadFormSection: React.FC<AdLeadFormSectionProps> = ({ idPrefix }) => {
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
      await submitLeadQuote(formData, { source: 'ads' });
      trackClientEvent(SITE_EVENT.LEAD_SUBMIT_ADS, { campaign: idPrefix.replace(/^ad-/, '') });
      trackMetaLead();
      setFormData(emptyLeadQuoteForm());
      navigate('/ads/thank-you', { replace: true });
    } catch (err: unknown) {
      setError(await leadQuoteSubmitErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="scroll-mt-28 py-16 md:py-24 bg-brand-dark border-y border-white/5">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <p className="font-display text-brand-yellow text-xs font-black uppercase tracking-[0.25em] text-center mb-3">
          Free quote
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-white text-center mb-2">
          Tell us about your vehicle
        </h2>
        <p className="text-white/55 text-center text-sm mb-8">
          We respond by email — usually the same day.
        </p>
        <div className="bg-brand-gray border border-white/10 rounded-lg p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}
            <LeadQuoteFormFields idPrefix={idPrefix} formData={formData} onChange={handleChange} />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-yellow text-brand-black py-4 font-black uppercase tracking-widest text-sm magnetic-cta disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending…' : 'Get my free quote'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdLeadFormSection;
