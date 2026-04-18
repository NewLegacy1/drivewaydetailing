import React from 'react';
import type { LeadQuoteFormState } from '@/lib/leadQuote';

type LeadQuoteFormFieldsProps = {
  idPrefix: string;
  formData: LeadQuoteFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const inputClass =
  'w-full px-4 py-3 bg-white border border-slate-300 rounded text-brand-navy placeholder-slate-400 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent focus:outline-none';
const labelClass = 'block text-slate-600 text-sm font-semibold uppercase tracking-wider mb-1.5';

const LeadQuoteFormFields: React.FC<LeadQuoteFormFieldsProps> = ({ idPrefix, formData, onChange }) => {
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
          inputMode="tel"
          autoComplete="tel"
          required
          value={formData.phone}
          onChange={onChange}
          className={inputClass}
          placeholder="(555) 123-4567"
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
    </>
  );
};

export default LeadQuoteFormFields;
