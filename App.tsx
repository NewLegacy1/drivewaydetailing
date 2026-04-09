import React, { useEffect, useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import HomePage from './components/HomePage';
import JetDetailingPage from './components/JetDetailingPage';
import CeramicCoatingPage from './components/CeramicCoatingPage';
import CityPage from './components/CityPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import AdsLayout from './components/ads/AdsLayout';
import AdCampaignLp from './components/ads/AdCampaignLp';
import AdThankYouPage from './components/AdThankYouPage';
import MobileDetailingLp from './components/MobileDetailingLp';
import MobileDetailingThankYouPage from './components/MobileDetailingThankYouPage';
import FleetDetailingPage from './components/FleetDetailingPage';
import ManitoulinTransportQuotePage from './components/ManitoulinTransportQuotePage';
import BoatCeramicCoatingPage from './components/BoatCeramicCoatingPage';
import SeoHead from './components/SeoHead';
import MetaPixelRouteTracker from './components/MetaPixelRouteTracker';
import { AD_CAMPAIGN_CERAMIC, AD_CAMPAIGN_DETAILING } from './lib/adCampaigns';
import { isMobileDetailingFunnelPath } from './lib/mobiledetailingRoutes';

const OPEN_QUOTE_EVENT = 'showroom-open-quote';

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
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [location.pathname]);
  return null;
};

const AppRoutes: React.FC = () => {
  const { pathname } = useLocation();
  const isAdsPath = pathname.startsWith('/ads');
  const hideSiteChrome = isAdsPath || isMobileDetailingFunnelPath(pathname);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const openQuote = useCallback(() => setShowLeadForm(true), []);
  const closeQuote = useCallback(() => setShowLeadForm(false), []);

  useEffect(() => {
    const handler = () => setShowLeadForm(true);
    window.addEventListener(OPEN_QUOTE_EVENT, handler);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, handler);
  }, []);

  return (
    <div className="min-h-screen bg-brand-black font-sans selection:bg-brand-yellow selection:text-brand-black">
      <RevealEffect />
      <LeadForm isOpen={showLeadForm} onClose={closeQuote} />
      {!hideSiteChrome && <Header onRequestQuote={openQuote} />}
      <main>
        <Routes>
          <Route path="/ads" element={<AdsLayout />}>
            <Route index element={<Navigate to="mobile-detailing" replace />} />
            <Route path="ceramic-coating" element={<AdCampaignLp config={AD_CAMPAIGN_CERAMIC} />} />
            <Route path="mobile-detailing" element={<AdCampaignLp config={AD_CAMPAIGN_DETAILING} />} />
            <Route path="thank-you" element={<AdThankYouPage />} />
            <Route path="quote" element={<Navigate to="/ads/mobile-detailing" replace />} />
          </Route>
          <Route path="/" element={<HomePage onRequestQuote={openQuote} />} />
          <Route path="/mobiledetailing/thank-you" element={<MobileDetailingThankYouPage />} />
          <Route path="/mobiledetailing" element={<MobileDetailingLp onRequestQuote={openQuote} />} />
          <Route path="/jetdetailing/:jetCity" element={<JetDetailingPage onRequestQuote={openQuote} />} />
          <Route path="/jetdetailing" element={<JetDetailingPage onRequestQuote={openQuote} />} />
          <Route path="/ceramic-coating" element={<CeramicCoatingPage onRequestQuote={openQuote} />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/thank-you" element={<Navigate to="/" replace />} />
          <Route path="/fleet-detailing" element={<FleetDetailingPage />} />
          <Route path="/fleet-detailing/:fleetCity" element={<FleetDetailingPage />} />
          <Route path="/quotes/manitoulin-transport" element={<ManitoulinTransportQuotePage />} />
          <Route path="/boat-ceramic-coating" element={<BoatCeramicCoatingPage />} />
          <Route path="/boat-ceramic-coating/:boatCity" element={<BoatCeramicCoatingPage />} />
          <Route path="/:city" element={<CityPage onRequestQuote={openQuote} />} />
        </Routes>
      </main>
      {!hideSiteChrome && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <SeoHead />
      <MetaPixelRouteTracker />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
