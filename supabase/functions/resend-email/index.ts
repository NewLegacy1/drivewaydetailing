import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

type LeadSource = 'website' | 'ads';

/** Must match your Supabase table (Table Editor “Showroom Organic”). Do not use `leads`. */
const ORGANIC_LEADS_TABLE = 'showroom_organic';
const ADS_LEADS_TABLE = 'showroom_ads';

interface LeadBody {
  name: string;
  email: string;
  phone: string;
  car_make_model?: string;
  service_notes?: string;
  /** Main site modal → website (`showroom_organic`). /ads/* → `showroom_ads`. */
  lead_source?: LeadSource;
  lead_type?: 'fleet_quote' | 'boat_quote';
  company?: string;
  fleet_city?: string;
  boat_city?: string;
  boat_marina?: string;
}

Deno.serve(async (req) => {
  // CORS preflight – must return 2xx with CORS headers or browser blocks the request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  let body: LeadBody;
  try {
    const raw = await req.text();
    if (!raw?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Request body is required (JSON).' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    body = JSON.parse(raw) as LeadBody;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON in request body.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const {
      name,
      email,
      phone,
      car_make_model,
      service_notes,
      lead_source: rawSource,
      lead_type,
      company,
      fleet_city,
      boat_city,
      boat_marina,
    } = body;

    const leadSource: LeadSource =
      rawSource === 'ads' ? 'ads' : 'website';

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and phone are required.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const table = leadSource === 'ads' ? ADS_LEADS_TABLE : ORGANIC_LEADS_TABLE;
    const { error: insertError } = await supabase.from(table).insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      car_make_model: car_make_model?.trim() ?? null,
      service_notes: service_notes?.trim() ?? null,
    });

    if (insertError) {
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    const leadEmailTo = Deno.env.get('LEAD_EMAIL_TO');
    const leadEmailFrom = Deno.env.get('LEAD_EMAIL_FROM');

    if (resendKey && leadEmailTo && leadEmailFrom) {
      const sourceLabel = leadSource === 'ads' ? 'Google Ads landing page' : 'main website';
      const isFleet = lead_type === 'fleet_quote';
      const isBoat = lead_type === 'boat_quote';
      const html = isFleet
        ? `
        <h2>Fleet quote request</h2>
        <p><strong>Source:</strong> ${escapeHtml(sourceLabel)}</p>
        <p><strong>Service area:</strong> ${escapeHtml(fleet_city?.trim() || '—')}</p>
        <p><strong>Company:</strong> ${escapeHtml(company?.trim() || '—')}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Label:</strong> ${escapeHtml(car_make_model || '—')}</p>
        <h3>Plan &amp; notes</h3>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f4f4f4;padding:12px;border-radius:8px;">${escapeHtml(service_notes || '—')}</pre>
      `
        : isBoat
          ? `
        <h2>Boat ceramic coating quote</h2>
        <p><strong>Source:</strong> ${escapeHtml(sourceLabel)}</p>
        <p><strong>Service area:</strong> ${escapeHtml(boat_city?.trim() || '—')}</p>
        <p><strong>Marina / slip:</strong> ${escapeHtml(boat_marina?.trim() || '—')}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Label:</strong> ${escapeHtml(car_make_model || '—')}</p>
        <h3>Plan &amp; notes</h3>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,monospace;font-size:13px;background:#f4f4f4;padding:12px;border-radius:8px;">${escapeHtml(service_notes || '—')}</pre>
      `
          : `
        <h2>New lead (${sourceLabel})</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Car make/model:</strong> ${escapeHtml(car_make_model || '—')}</p>
        <p><strong>Service notes:</strong></p>
        <p>${escapeHtml(service_notes || '—')}</p>
      `;
      const fleetAreaBit = fleet_city?.trim() ? ` (${fleet_city.trim()})` : '';
      const boatAreaBit = boat_city?.trim() ? ` (${boat_city.trim()})` : '';
      const subject = isFleet
        ? `[Fleet] Quote — ${name.trim()}${fleetAreaBit}`
        : isBoat
          ? `[Boat ceramic] Quote — ${name.trim()}${boatAreaBit}`
          : leadSource === 'ads'
            ? `[Ads] New lead: ${name.trim()}`
            : `New lead: ${name.trim()}`;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: leadEmailFrom,
          to: [leadEmailTo],
          subject,
          html,
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        console.error('Resend error:', res.status, errText);
        // Don't fail the request – lead is already saved
      }
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: String(e) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
