import React from 'react';
import { Link } from 'react-router-dom';

const AdMinimalFooter: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="text-white/50 text-xs uppercase tracking-wider">
          <p className="font-bold text-white/70 mb-1">ShowRoom AutoCare</p>
          <p>Mobile detailing & ceramic coating · Hamilton & GTA</p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 text-sm">
          <a href="tel:+19053794820" className="text-brand-yellow font-bold hover:underline">
            (905) 379-4820
          </a>
          <a href="mailto:contact@showroomautocare.ca" className="text-white/70 hover:text-brand-yellow transition-colors">
            contact@showroomautocare.ca
          </a>
          <Link to="/" className="text-white/45 text-xs uppercase tracking-widest hover:text-brand-yellow transition-colors mt-1">
            Full website
          </Link>
        </div>
      </div>
      <p className="text-center text-white/25 text-[10px] uppercase tracking-widest mt-8">
        © {new Date().getFullYear()} ShowRoom AutoCare
      </p>
    </footer>
  );
};

export default AdMinimalFooter;
