import React from 'react';
import type { LeadQuoteFormState } from '@/lib/leadQuote';

type LeadQuoteFormFieldsProps = {
  idPrefix: string;
  formData: LeadQuoteFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  showBookNow?: boolean;
};

const inputClass =
  'w-full px-4 py-3 bg-brand-black border border-white/10 rounded text-white placeholder-white/30 focus:border-brand-yellow focus:outline-none';
const labelClass = 'block text-white/70 text-sm font-semibold uppercase tracking-wider mb-1.5';

const LeadQuoteFormFields: React.FC<LeadQuoteFormFieldsProps> = ({
  idPrefix,
  formData,
  onChange,
  showBookNow = false,
}) => {
  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}-name`} className={labelClass}>
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={onChange}
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-email`} className={labelClass}>
          Email
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={onChange}
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className={labelClass}>
          Phone
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={onChange}
          className={inputClass}
          placeholder="(905) 000-0000"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-car`} className={labelClass}>
          Car make / model
        </label>
        <input
          id={`${idPrefix}-car`}
          name="carMakeModel"
          type="text"
          value={formData.carMakeModel}
          onChange={onChange}
          className={inputClass}
          placeholder="e.g. Honda Civic 2022"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-notes`} className={labelClass}>
          Service notes
        </label>
        <textarea
          id={`${idPrefix}-notes`}
          name="serviceNotes"
          rows={3}
          value={formData.serviceNotes}
          onChange={onChange}
          className={`${inputClass} resize-none`}
          placeholder="What service are you interested in? Any details we should know?"
        />
      </div>
      {showBookNow && (
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
      )}
    </>
  );
};

export default LeadQuoteFormFields;
