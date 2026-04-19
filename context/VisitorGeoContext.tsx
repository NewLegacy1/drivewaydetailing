import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { VisitorGeo } from '@/lib/visitorGeoCopy';

type VisitorGeoState = {
  geo: VisitorGeo | null;
  status: 'idle' | 'loading' | 'ready' | 'error';
};

const VisitorGeoContext = createContext<VisitorGeoState>({ geo: null, status: 'idle' });

/** IP-based approximate location (city/region/country). One request per session; no GPS. */
export const VisitorGeoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<VisitorGeoState>({ geo: null, status: 'loading' });

  useEffect(() => {
    const ac = new AbortController();
    const t = window.setTimeout(() => ac.abort(), 9000);

    (async () => {
      try {
        const res = await fetch('https://ipwho.is/', { signal: ac.signal });
        const data = (await res.json()) as {
          success?: boolean;
          country?: string;
          country_code?: string;
          region?: string;
          city?: string;
        };
        if (!data?.success) {
          setState({ geo: null, status: 'error' });
          return;
        }
        const geo: VisitorGeo = {
          country: String(data.country ?? ''),
          countryCode: String(data.country_code ?? '').toUpperCase(),
          region: String(data.region ?? ''),
          city: String(data.city ?? ''),
        };
        setState({ geo, status: 'ready' });
      } catch {
        setState({ geo: null, status: 'error' });
      } finally {
        window.clearTimeout(t);
      }
    })();

    return () => {
      window.clearTimeout(t);
      ac.abort();
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <VisitorGeoContext.Provider value={value}>{children}</VisitorGeoContext.Provider>;
};

export function useVisitorGeo(): VisitorGeoState {
  return useContext(VisitorGeoContext);
}
