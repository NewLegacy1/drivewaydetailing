import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS } from '@/lib/site';

const AdMinimalFooter: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="text-white/50 text-xs uppercase tracking-wider">
          <p className="font-bold text-white/70 mb-1">{BUSINESS.name}</p>
          <p>Mobile detailing & ceramic coating · GTA</p>
        </div>
        <div className="flex flex-col sm:items-end gap-2 text-sm">
          <p className="text-white/60 text-xs max-w-xs sm:text-right leading-relaxed">
            Request a quote on the main site — use the quote form; we respond with options.
          </p>
          <Link to="/" className="text-white/45 text-xs uppercase tracking-widest hover:text-brand-yellow transition-colors mt-1">
            Full website
          </Link>
        </div>
      </div>
      <p className="text-center text-white/25 text-[10px] uppercase tracking-widest mt-8">
        © {new Date().getFullYear()} {BUSINESS.name}
      </p>
    </footer>
  );
};

export default AdMinimalFooter;
