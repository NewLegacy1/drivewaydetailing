import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

/** Lowercase snake_case, 2–64 chars */
function isValidEventName(s: string): boolean {
  return /^[a-z][a-z0-9_]{1,63}$/.test(s);
}

type EventsTable = 'ddc_organic_events' | 'ddc_ads_events';

/** Path without query string; /ads/* → ad tracking table, else organic. */
function eventsTableForPath(path: string | null): EventsTable {
  const base = path?.split('?')[0]?.trim() ?? '';
  if (base.startsWith('/ads')) return 'ddc_ads_events';
  return 'ddc_organic_events';
}

function sanitizeMeta(raw: unknown): Record<string, string | number | boolean | null> {
  if (raw === null || raw === undefined) return {};
  if (typeof raw !== 'object' || Array.isArray(raw)) return {};
  const out: Record<string, string | number | boolean | null> = {};
  let n = 0;
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (n >= 24) break;
    if (!/^[a-z][a-z0-9_]{0,48}$/i.test(k)) continue;
    if (v === null || typeof v === 'boolean' || typeof v === 'number') {
      if (typeof v === 'number' && !Number.isFinite(v)) continue;
      out[k] = v;
    } else if (typeof v === 'string' && v.length <= 200) {
      out[k] = v;
    }
    n++;
  }
  return out;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: { event_name?: string; path?: string; meta?: unknown };
  try {
    const raw = await req.text();
    if (!raw?.trim()) {
      return new Response(JSON.stringify({ error: 'JSON body required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    body = JSON.parse(raw) as typeof body;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const name = typeof body.event_name === 'string' ? body.event_name.trim() : '';
  if (!isValidEventName(name)) {
    return new Response(JSON.stringify({ error: 'Invalid event_name' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const path =
    typeof body.path === 'string' && body.path.length <= 500
      ? body.path.trim().slice(0, 500)
      : null;
  const meta = sanitizeMeta(body.meta);

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const table = eventsTableForPath(path);

    const { error } = await supabase.from(table).insert({
      event_name: name,
      path,
      meta,
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
