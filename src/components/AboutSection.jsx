import React from 'react';
import { Clock, Lightbulb, Heart, Sparkles, Flower2 } from 'lucide-react';

export default function AboutSection() {
  // 3 small highlights required by prompt:
  // - Made with Patience — I enjoy taking my time with every detail.
  // - Inspired by Creativity — I love exploring new patterns and ideas.
  // - Created by Hand — Every creation reflects my time and imagination.
  const highlights = [
    {
      icon: Clock,
      title: 'Made with Patience',
      description: 'I enjoy taking my time with every detail.',
      color: 'bg-rose-50 text-[#DB2777] border-rose-200',
    },
    {
      icon: Lightbulb,
      title: 'Inspired by Creativity',
      description: 'I love exploring new patterns and ideas.',
      color: 'bg-pink-50 text-pink-600 border-pink-200',
    },
    {
      icon: Heart,
      title: 'Created by Hand',
      description: 'Every creation reflects my time and imagination.',
      color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            About Me
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3 leading-tight">
            Where Stillness Meets <br />
            <span className="italic font-display text-[#DB2777]">Handmade Devotion</span>
          </h2>
        </div>

        {/* Narrative Journal Editorial Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#FBCFE8] shadow-[0_12px_36px_rgba(251,207,232,0.35)] space-y-8 relative overflow-hidden">
          {/* Subtle floral watermark background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCE7ED]/50 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          {/* Simple, personal description */}
          <div className="space-y-4 text-base sm:text-lg text-[#4E3C44] leading-relaxed max-w-3xl mx-auto text-center sm:text-left">
            <p>
              Creativity is my way of expressing myself. I enjoy spending time making things by hand, trying new ideas, and adding small details to every creation.
            </p>
            <p>
              I love the patience behind mandala art, the beauty of Lippan art, the freedom of drawing, and the joy of making something new through art and craft.
            </p>
            <p className="text-sm sm:text-base text-[#4E3C44]/85">
              For me, creating art is not about being perfect. It is about enjoying the process, learning something new, and turning simple ideas into something special.
            </p>
          </div>

          {/* Handcrafted Quote Banner */}
          <div className="py-4 border-y border-[#FBCFE8]/60 flex items-center justify-center text-center">
            <p className="font-serif italic text-lg sm:text-xl text-[#DB2777] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DB2777]" />
              <span>“Hands that sculpt, lines that meditate, a heart that finds rest.”</span>
              <Sparkles className="w-4 h-4 text-[#DB2777]" />
            </p>
          </div>

          {/* Three Highlights Cards */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {highlights.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="bg-white/80 p-5 rounded-2xl border border-[#FBCFE8] hover:border-[#DB2777]/50 transition-all shadow-xs flex flex-col justify-between space-y-3 group hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${val.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#291D22]">
                        {val.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4E3C44]/80 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
