import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-12 pb-16 border-t border-[#FBCFE8]/70 bg-[#FFF8FA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#FBCFE8]/50">
          {/* Brand & Tagline */}
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-serif text-2xl font-bold text-[#291D22]">
                Tanvi’s Atelier
              </span>
              <span className="w-2 h-2 rounded-full bg-[#DB2777]" />
            </div>
            <p className="font-handwriting text-base text-[#DB2777]">
              Art &amp; Craft • Lippan Art • Mandala Art • Drawing
            </p>
          </div>

          {/* Back to top link */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#FBCFE8] text-xs font-semibold text-[#4E3C44] hover:text-[#DB2777] hover:border-[#DB2777] shadow-sm transition-all transform hover:-translate-y-0.5"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#DB2777]" />
          </button>
        </div>

        {/* Text required by prompt Section 11:
            “Tanvi’s Creative Portfolio — Made with creativity, patience, and love.” */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#4E3C44]/85">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <span>Tanvi’s Creative Portfolio — Made with creativity, patience, and love.</span>
            <Heart className="w-3.5 h-3.5 text-[#DB2777] fill-[#DB2777] inline" />
          </p>

          <p className="text-[11px] text-[#4E3C44]/60">
            © {new Date().getFullYear()} Tanvi’s Atelier. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
