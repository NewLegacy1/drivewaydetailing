import { supabase } from './supabase';

export type LeadQuoteFormState = {
  name: string;
  email: string;
  phone: string;
  carMakeModel: string;
  serviceNotes: string;
};

/** `website` → organic leads table. `ads` → ads leads table (Edge Function routes by this). */
export type LeadSubmitSource = 'website' | 'ads';

export function emptyLeadQuoteForm(): LeadQuoteFormState {
  return { name: '', email: '', phone: '', carMakeModel: '', serviceNotes: '' };
}

export async function submitLeadQuote(
  form: LeadQuoteFormState,
  options?: { source?: LeadSubmitSource }
): Promise<void> {
  if (!supabase) {
    throw new Error('Form is not configured. Please add Supabase keys to .env.');
  }
  const source: LeadSubmitSource = options?.source === 'ads' ? 'ads' : 'website';
  const { data, error: fnError } = await supabase.functions.invoke('resend-email', {
    body: {
      name: form.name,
      email: form.email,
      phone: form.phone.trim(),
      car_make_model: form.carMakeModel || undefined,
      service_notes: form.serviceNotes || undefined,
      lead_source: source,
    },
  });
  if (fnError) throw fnError;
  const result = data as { ok?: boolean; error?: string } | null;
  if (result?.error) throw new Error(result.error);
}

export type FleetQuoteSubmitPayload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  fleetCityLabel: string;
  summaryText: string;
  carMakeModelShort: string;
};

export async function submitFleetQuote(payload: FleetQuoteSubmitPayload): Promise<void> {
  if (!supabase) {
    throw new Error('Form is not configured. Please add Supabase keys to .env.');
  }
  let service_notes = payload.summaryText.trim();
  if (payload.notes?.trim()) {
    service_notes += `\n\n---\nAdditional notes:\n${payload.notes.trim()}`;
  }
  const { data, error: fnError } = await supabase.functions.invoke('resend-email', {
    body: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      car_make_model: payload.carMakeModelShort,
      service_notes,
      lead_source: 'website',
      lead_type: 'fleet_quote',
      fleet_city: payload.fleetCityLabel,
      company: payload.company?.trim() || undefined,
    },
  });
  if (fnError) throw fnError;
  const result = data as { ok?: boolean; error?: string } | null;
  if (result?.error) throw new Error(result.error);
}

export type BoatQuoteSubmitPayload = {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  boatCityLabel: string;
  marinaOrSlip?: string;
  summaryText: string;
  carMakeModelShort: string;
};

export async function submitBoatQuote(payload: BoatQuoteSubmitPayload): Promise<void> {
  if (!supabase) {
    throw new Error('Form is not configured. Please add Supabase keys to .env.');
  }
  let service_notes = payload.summaryText.trim();
  if (payload.notes?.trim()) {
    service_notes += `\n\n---\nAdditional notes:\n${payload.notes.trim()}`;
  }
  const { data, error: fnError } = await supabase.functions.invoke('resend-email', {
    body: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      car_make_model: payload.carMakeModelShort,
      service_notes,
      lead_source: 'website',
      lead_type: 'boat_quote',
      boat_city: payload.boatCityLabel,
      boat_marina: payload.marinaOrSlip?.trim() || undefined,
    },
  });
  if (fnError) throw fnError;
  const result = data as { ok?: boolean; error?: string } | null;
  if (result?.error) throw new Error(result.error);
}

export async function leadQuoteSubmitErrorMessage(err: unknown): Promise<string> {
  if ((err as { name?: string })?.name === 'FunctionsFetchError') {
    return 'Could not reach the server. Make sure the resend-email Edge Function is deployed to Supabase (see README).';
  }
  if ((err as { name?: string })?.name === 'FunctionsHttpError') {
    const res = (err as { context?: Response })?.context;
    try {
      if (res && typeof res.json === 'function') {
        const body = await res.json() as { error?: string };
        return body?.error ?? (err instanceof Error ? err.message : 'The server returned an error.');
      }
      return err instanceof Error ? err.message : 'The server returned an error.';
    } catch {
      return err instanceof Error ? err.message : 'The server returned an error.';
    }
  }
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}
