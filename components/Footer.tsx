
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-brand-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ShowRoom AutoCare" className="h-8 w-auto" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed uppercase tracking-wider font-semibold">
              Hamilton's #1 Choice for Mobile Ceramic Coating & Paint Restoration.
            </p>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-yellow text-sm tracking-[0.2em] mb-6">Blog</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Detailing tips, ceramic coating care, and local guides for Hamilton and the GTA.
            </p>
            <a href="/blog" className="text-white font-bold hover:text-brand-yellow transition-colors text-sm uppercase tracking-wider">
              Read the blog
            </a>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-yellow text-sm tracking-[0.2em] mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-brand-yellow">📞</span>
                <a href="tel:+19053794820" className="text-white font-bold hover:text-brand-yellow transition-colors">(905) 379-4820</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-yellow">✉️</span>
                <a href="mailto:contact@showroomautocare.ca" className="text-white font-bold hover:text-brand-yellow transition-colors">contact@showroomautocare.ca</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-yellow text-sm tracking-[0.2em] mb-6">Hours</h4>
            <p className="text-white/70 text-sm font-bold uppercase tracking-tighter">
              24/7 — We Come To You
            </p>
          </div>

          <div>
            <h4 className="font-display font-black uppercase text-brand-yellow text-sm tracking-[0.2em] mb-6">Social</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:border-brand-yellow hover:text-brand-yellow text-white/70 hover:bg-brand-yellow/5 transition-all" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:border-brand-yellow hover:text-brand-yellow text-white/70 hover:bg-brand-yellow/5 transition-all" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:border-brand-yellow hover:text-brand-yellow text-white/70 hover:bg-brand-yellow/5 transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/30">
          <p>© 2021–2025 ShowRoom AutoCare. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-brand-yellow transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-yellow transition-colors">Terms of Service</a>
            <a href="https://newlegacyai.ca" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Site by New Legacy AI</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
