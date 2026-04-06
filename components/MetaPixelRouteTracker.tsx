import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMetaPageView } from '@/lib/metaPixel';

/**
 * Fires Meta Pixel PageView on client-side route changes (first hit is covered by index.html).
 */
const MetaPixelRouteTracker: React.FC = () => {
  const { pathname, search } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    trackMetaPageView();
  }, [pathname, search]);

  return null;
};

export default MetaPixelRouteTracker;
