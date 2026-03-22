import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LeadForm from './components/LeadForm';
import HomePage from './components/HomePage';
import JetDetailingPage from './components/JetDetailingPage';
import CityPage from './components/CityPage';
import BlogListPage from './components/BlogListPage';
import BlogPostPage from './components/BlogPostPage';
import SeoHead from './components/SeoHead';

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

const App: React.FC = () => {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const openQuote = useCallback(() => setShowLeadForm(true), []);
  const closeQuote = useCallback(() => setShowLeadForm(false), []);

  useEffect(() => {
    const handler = () => setShowLeadForm(true);
    window.addEventListener(OPEN_QUOTE_EVENT, handler);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, handler);
  }, []);

  return (
    <BrowserRouter>
      <SeoHead />
      <div className="min-h-screen bg-brand-black font-sans selection:bg-brand-yellow selection:text-brand-black">
        <RevealEffect />
        <LeadForm isOpen={showLeadForm} onClose={closeQuote} />
        <Header onRequestQuote={openQuote} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage onRequestQuote={openQuote} />} />
            <Route path="/jetdetailing" element={<JetDetailingPage onRequestQuote={openQuote} />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/:city" element={<CityPage onRequestQuote={openQuote} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
