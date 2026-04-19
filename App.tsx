import React, { useEffect, useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import HomePage from './components/HomePage';
import SeoHead from './components/SeoHead';
import MetaPixelRouteTracker from './components/MetaPixelRouteTracker';
import { VisitorGeoProvider } from './context/VisitorGeoContext';

const OPEN_QUOTE_EVENT = 'ddc-open-quote';

const RevealEffect: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);
    const el = () => {
      document.querySelectorAll('.reveal').forEach((elem) => {
        elem.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(elem);
      });
    };
    el();
    const t = setTimeout(el, 100);
    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [location.pathname]);
  return null;
};

const AppRoutes: React.FC = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const openQuote = useCallback(() => setShowLeadForm(true), []);
  const closeQuote = useCallback(() => setShowLeadForm(false), []);

  useEffect(() => {
    const handler = () => setShowLeadForm(true);
    window.addEventListener(OPEN_QUOTE_EVENT, handler);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, handler);
  }, []);

  return (
    <div className="min-h-screen bg-brand-page text-brand-black font-sans selection:bg-brand-yellow/25 selection:text-brand-navy">
      <RevealEffect />
      <LeadForm isOpen={showLeadForm} onClose={closeQuote} />
      <Header onRequestQuote={openQuote} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onRequestQuote={openQuote} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <VisitorGeoProvider>
        <Analytics />
        <SeoHead />
        <MetaPixelRouteTracker />
        <AppRoutes />
      </VisitorGeoProvider>
    </BrowserRouter>
  );
};

export default App;
