import React, { useState } from 'react';
import { Sparkles, Heart, Compass, Palette, Pencil } from 'lucide-react';

export default function HeroSection() {
  // Tanvi's actual photo
  const photo = '/images/tanvi_hero.jpg';

  // 4 hobby labels:
  // Art & Craft, Lippan Art, Mandala Art, Drawing
  const hobbies = [
    { label: 'Art & Craft', icon: Palette, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Lippan Art', icon: Sparkles, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { label: 'Mandala Art', icon: Compass, color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200' },
    { label: 'Drawing', icon: Pencil, color: 'text-rose-600 bg-rose-50 border-rose-200' },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 sm:pb-28 flex items-center">
      {/* Decorative floral watermark doodle */}
      <div className="absolute top-20 left-10 pointer-events-none opacity-25 select-none hidden lg:block">
        <svg width="240" height="240" viewBox="0 0 200 200" fill="none" stroke="#FBCFE8" strokeWidth="1.2">
          <circle cx="100" cy="100" r="85" strokeDasharray="4 4" />
          <path d="M100 20 C120 70, 170 80, 180 100 C170 120, 120 130, 100 180 C80 130, 30 120, 20 100 C30 80, 80 70, 100 20 Z" />
          <circle cx="100" cy="100" r="30" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Column 1: Artist Intro & Typography (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE7ED] border border-[#FBCFE8] text-xs font-semibold tracking-wider text-[#DB2777] uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-ping" />
              <span>Handmade with Love &amp; Creativity</span>
            </div>

            {/* Main heading & Supporting heading */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#291D22] leading-[1.08]">
                Hello, I’m <br />
                <span className="italic font-display font-medium text-[#DB2777] relative inline-block">
                  Tanvi
                  {/* Subtle hand-drawn underline doodle */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#FBCFE8]"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    <path d="M2,9 Q50,2 98,7" />
                  </svg>
                </span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-[#DB2777] font-semibold italic pt-1">
                Where Stillness Meets Handmade Devotion
              </p>
            </div>

            {/* Simple introduction */}
            <p className="text-base sm:text-lg text-[#4E3C44] leading-relaxed max-w-xl">
              I love creating beautiful things with my hands. From detailed mandala patterns to traditional Lippan art and simple drawings, every piece gives me a chance to explore my imagination and enjoy the little details.
            </p>

            {/* Two buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('interests')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#DB2777] text-white font-semibold text-sm shadow-[0_6px_20px_rgba(219,39,119,0.35)] hover:bg-[#be185d] hover:shadow-[0_8px_25px_rgba(219,39,119,0.45)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB2777]"
              >
                <span>Explore My Creativity</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/90 border border-[#FBCFE8] text-[#291D22] font-semibold text-sm shadow-sm hover:bg-[#FCE7ED] hover:border-[#DB2777]/50 transition-all transform hover:-translate-y-0.5"
              >
                <span>Get in Touch</span>
                <Heart className="w-4 h-4 text-[#DB2777]" />
              </button>
            </div>

            {/* Four hobby labels */}
            <div className="pt-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#4E3C44]/70 mb-3">
                My Creative Loves
              </span>
              <div className="flex flex-wrap gap-2.5">
                {hobbies.map((hobby) => {
                  const Icon = hobby.icon;
                  return (
                    <span
                      key={hobby.label}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-xs transition-transform hover:scale-105 ${hobby.color}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{hobby.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Polaroid-inspired Photo Frame (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Decorative paper tape scrapbook accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#FBCFE8]/80 backdrop-blur-xs border border-white/60 -rotate-2 z-20 shadow-xs pointer-events-none rounded-xs opacity-90" />

              {/* Floating decorative sparkle */}
              <div className="absolute -top-6 -right-6 text-[#DB2777] animate-float-slow hidden sm:block">
                <Sparkles className="w-7 h-7" />
              </div>

              {/* Polaroid Frame */}
              <div
                className="relative bg-white p-4 sm:p-5 pb-7 sm:pb-8 rounded-2xl polaroid-frame border border-[#FBCFE8]/70 transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[340px] sm:max-w-[370px]"
                style={{
                  boxShadow: '0 20px 40px -12px rgba(219, 39, 119, 0.16), 0 4px 16px -2px rgba(78, 60, 68, 0.1)',
                }}
              >
                {/* Photo container with Tanvi's permanent portrait */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#FDF2F5] shadow-inner group/photo flex items-center justify-center border border-[#FBCFE8]/60">
                  <img
                    src={photo}
                    alt="Tanvi"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handcrafted Polaroid caption: "TANVI’S CREATIVE SPACE" */}
                <div className="mt-4 text-center border-t border-[#FBCFE8]/40 pt-3">
                  <p className="font-serif tracking-widest text-xs uppercase font-bold text-[#291D22]">
                    TANVI’S CREATIVE SPACE
                  </p>
                  <p className="font-handwriting text-base text-[#DB2777] mt-0.5 tracking-wide">
                    Tanvi
                  </p>
                </div>

                {/* Small pin hole detail */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#4E3C44]/20 shadow-inner" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
