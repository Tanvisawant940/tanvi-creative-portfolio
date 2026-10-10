import React, { useState } from 'react';
import { Sparkles, Compass, Pencil, Scissors, Palette, Layers, ChevronRight } from 'lucide-react';
import { creativePursuits } from '../data/creativePursuits';

export default function CreativePursuits() {
  const [activeTab, setActiveTab] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Compass': return Compass;
      case 'Pencil': return Pencil;
      case 'Scissors': return Scissors;
      case 'Palette': return Palette;
      default: return Sparkles;
    }
  };

  return (
    <section id="mediums" className="py-20 sm:py-28 bg-[#FDF2F5]/70 relative">
      {/* Decorative background paper edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FBCFE8] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Creative Mediums
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            Things I Love to Create
          </h2>
          <p className="text-base sm:text-lg text-[#4E3C44]/80 mt-3 font-normal">
            Five tactile journeys across clay, mirrors, ink, graphite, and paper—each with its own soulful cadence and physical dialogue.
          </p>
        </div>

        {/* Varied Editorial Panels Layout */}
        <div className="space-y-10 sm:space-y-12">
          {creativePursuits.map((pursuit, idx) => {
            const Icon = getIcon(pursuit.iconName);
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={pursuit.id}
                className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#FBCFE8] shadow-[0_10px_30px_rgba(251,207,232,0.3)] hover:border-[#DB2777]/40 transition-all duration-300 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Artwork Showcase */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#FCE7ED] shadow-md border-2 border-white">
                      <img
                        src={pursuit.image}
                        alt={`${pursuit.category} artwork - ${pursuit.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Gradient tag overlay */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#FBCFE8] flex items-center gap-1.5 shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-[#DB2777]" />
                        <span className="text-xs font-bold text-[#291D22] uppercase tracking-wider">
                          {pursuit.category}
                        </span>
                      </div>

                      {/* Mirror sparkle badge for Lippan or special detail */}
                      {pursuit.id === 'lippan' && (
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#DB2777] border border-[#FBCFE8] flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Real Mirror Inlays</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Editorial Details & Content */}
                  <div className={`lg:col-span-7 space-y-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Header meta */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-[#DB2777]">
                          Medium 0{idx + 1}
                        </span>
                        <span className="text-[#FBCFE8]">•</span>
                        <span className="text-xs text-[#4E3C44]/70 font-medium">
                          {pursuit.subtitle}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#291D22]">
                        {pursuit.title}
                      </h3>
                    </div>

                    {/* Concise description */}
                    <p className="text-sm sm:text-base text-[#4E3C44] leading-relaxed">
                      {pursuit.description}
                    </p>

                    <p className="text-xs sm:text-sm text-[#4E3C44]/80 italic font-display">
                      {pursuit.details}
                    </p>

                    {/* Materials section */}
                    <div className="pt-2 border-t border-[#FBCFE8]/60">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#291D22] mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#DB2777]" />
                        <span>Materials & Tools</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {pursuit.materials.map((mat) => (
                          <span
                            key={mat}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#FBCFE8] text-[#4E3C44] font-medium"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {pursuit.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-[#DB2777] bg-[#FCE7ED] px-2.5 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
