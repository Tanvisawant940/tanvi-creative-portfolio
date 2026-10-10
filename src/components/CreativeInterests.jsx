import React from 'react';
import { Palette, Sparkles, Compass, Pencil, Layers } from 'lucide-react';

const pursuits = [
  {
    id: 'art-and-craft',
    category: 'Art & Craft',
    title: 'Art & Craft',
    description: 'I enjoy making handmade decorations and trying creative ideas with different materials. I love turning simple things into something special.',
    materials: ['Craft paper & cardstock', 'Scissors & precision craft knife', 'PVA adhesive & tape', 'Decorative trims & beads'],
    image: '/images/art_and_craft.png',
    icon: Palette,
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  {
    id: 'lippan-art',
    category: 'Lippan Art',
    title: 'Lippan Art',
    description: 'I love creating beautiful patterns with clay and mirrors. The shapes, textures, and tiny details make every piece special.',
    materials: ['Mouldit clay / ceramic dough', 'Shaped craft mirrors (Abhla)', 'Wooden MDF base board', 'Chalk paint & acrylic colors'],
    image: '/images/lippan_art.png',
    icon: Sparkles,
    color: 'text-pink-600 bg-pink-50 border-pink-200',
  },
  {
    id: 'mandala-art',
    category: 'Mandala Art',
    title: 'Mandala Art',
    description: 'Mandala art helps me enjoy the beauty of patterns, shapes, and symmetry. I love creating detailed designs one small line at a time.',
    materials: ['Pigment fine liners (0.05mm - 0.8mm)', 'Protractor & compass', 'Heavy cartridge sketch paper', 'White gel pen for highlights'],
    image: '/images/mandala_art.png',
    icon: Compass,
    color: 'text-fuchsia-600 bg-fuchsia-50 border-fuchsia-200',
  },
  {
    id: 'drawing',
    category: 'Drawing',
    title: 'Drawing',
    description: 'Drawing lets me turn my ideas into pictures. I enjoy working with lines, shapes, shading, and small details.',
    materials: ['Graphite pencils (HB to 6B)', 'Charcoal sticks', 'Blending stumps & tortillons', 'Kneaded eraser & sketchpad'],
    image: '/images/drawing_art.jpg',
    icon: Pencil,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
  },
];

export default function CreativeInterests() {
  return (
    <section id="interests" className="py-20 sm:py-28 bg-[#FDF2F5]/70 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FBCFE8] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Subtitle as requested */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Creative Interests
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            Little Things I Like to Create
          </h2>
          <p className="text-base sm:text-lg text-[#4E3C44]/80 mt-3 font-normal italic font-display">
            “Every art form gives me a new way to express my imagination.”
          </p>
        </div>

        {/* Editorial Layout: Alternating 4 Cards */}
        <div className="space-y-10 sm:space-y-12">
          {pursuits.map((item, idx) => {
            const Icon = item.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#FBCFE8] shadow-[0_10px_30px_rgba(251,207,232,0.3)] hover:border-[#DB2777]/40 transition-all duration-300 group"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Artwork Showcase (5 cols) */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FCE7ED] shadow-md border-2 border-white flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={`${item.category} by Tanvi`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Badge tag */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#FBCFE8] flex items-center gap-1.5 shadow-sm">
                        <Icon className="w-3.5 h-3.5 text-[#DB2777]" />
                        <span className="text-xs font-bold text-[#291D22] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details & Content (7 cols) */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold tracking-wider uppercase text-[#DB2777]">
                          Art Interest 0{idx + 1}
                        </span>
                        <span className="text-[#FBCFE8]">•</span>
                        <span className="text-xs text-[#4E3C44]/70 font-medium">
                          Handcrafted Expression
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#291D22]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-[#4E3C44] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Materials list */}
                    <div className="pt-2 border-t border-[#FBCFE8]/60">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#291D22] mb-2.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#DB2777]" />
                        <span>Materials &amp; Tools Used</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.materials.map((mat) => (
                          <span
                            key={mat}
                            className="text-xs px-3 py-1 rounded-lg bg-white border border-[#FBCFE8] text-[#4E3C44] font-medium shadow-xs"
                          >
                            {mat}
                          </span>
                        ))}
                      </div>
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
