import React from 'react';
import { Lightbulb, Sparkles, HeartHandshake, Compass, Palette, Flower2 } from 'lucide-react';

export default function CreativeProcess() {
  const steps = [
    {
      number: '01',
      title: 'Imagine',
      subtitle: 'Finding Inspiration & Exploring Ideas',
      description:
        'A wander through nature, temple motifs, or simply watching morning shadows cross a windowsill. Sketching rough thumbnails on scrap paper and letting intuition guide the geometry.',
      icon: Lightbulb,
      tag: 'The Spark',
      color: 'bg-rose-50 text-[#DB2777] border-rose-200',
    },
    {
      number: '02',
      title: 'Create',
      subtitle: 'Experimenting with Materials & Textures',
      description:
        'Kneading the clay, mixing pastel pigments, scoring paper folds, and inlaying reflective glass mirrors. Hours of rhythmic, tactile patience where the work slowly takes physical form.',
      icon: Palette,
      tag: 'Tactile Devotion',
      color: 'bg-pink-50 text-pink-600 border-pink-200',
    },
    {
      number: '03',
      title: 'Cherish',
      subtitle: 'Appreciating the Finished Handmade Piece',
      description:
        'Sealing the work with protective matte finishes, stepping back to watch mirrors sparkle under changing daylight, and celebrating the warmth of human imperfections.',
      icon: HeartHandshake,
      tag: 'Soulful Presence',
      color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FDF2F5]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            The Creative Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            From First Sketch to Final Detail
          </h2>
          <p className="text-sm sm:text-base text-[#4E3C44]/80 mt-3 font-normal">
            Every creation begins in quiet curiosity and ends with a piece that carries memories of touch, time, and devotion.
          </p>
        </div>

        {/* 3-Stage Connected Visual Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-[#FBCFE8] via-[#DB2777]/30 to-[#FBCFE8] -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="glass-card rounded-3xl p-7 border border-[#FBCFE8] shadow-md hover:border-[#DB2777]/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Step Badge & Number */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display italic text-3xl font-bold text-[#DB2777]/40 group-hover:text-[#DB2777] transition-colors">
                        {step.number}
                      </span>
                      <div className={`p-3 rounded-2xl border ${step.color} shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#DB2777] bg-[#FCE7ED] px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {step.tag}
                    </span>

                    <h3 className="font-serif text-2xl font-bold text-[#291D22] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#4E3C44]/75 mb-3">
                      {step.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[#4E3C44]/90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#FBCFE8]/60 flex items-center justify-between text-[11px] text-[#4E3C44]/70">
                    <span className="font-handwriting text-base text-[#DB2777]">
                      Step {idx + 1} of 3
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#DB2777]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
