import React, { useState } from 'react';
import { Heart, Sparkles, Eye, Filter } from 'lucide-react';
import { artworks } from '../data/artworks';
import ArtworkLightbox from './ArtworkLightbox';

export default function CuratedWorks() {
  const [filter, setFilter] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [likesState, setLikesState] = useState(() => {
    const map = {};
    artworks.forEach((art) => {
      map[art.id] = { count: art.initialLikes, liked: false };
    });
    return map;
  });

  const categories = ['All', 'Lippan', 'Mandala', 'Sketching', 'Papercraft', 'Craft'];

  const filteredArtworks = filter === 'All'
    ? artworks
    : artworks.filter((item) => item.category.toLowerCase() === filter.toLowerCase());

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[id] || { count: 0, liked: false };
      const newLiked = !current.liked;
      const newCount = newLiked ? current.count + 1 : Math.max(0, current.count - 1);
      return {
        ...prev,
        [id]: { count: newCount, liked: newLiked },
      };
    });
  };

  const openLightbox = (artworkId) => {
    const idx = filteredArtworks.findIndex((a) => a.id === artworkId);
    if (idx !== -1) {
      setActiveLightboxIndex(idx);
    }
  };

  const currentArtwork = activeLightboxIndex !== null ? filteredArtworks[activeLightboxIndex] : null;

  const handlePrev = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredArtworks.length - 1));
    }
  };

  const handleNext = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev < filteredArtworks.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Curated Works Archive
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            Collected Little Wonders
          </h2>
          <p className="text-sm sm:text-base text-[#4E3C44]/80 mt-3 font-normal">
            A quiet visual archive of handmade experiments. Click any creation to uncover its materials, craft stories, and behind-the-scenes logs.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                filter === cat
                  ? 'bg-[#DB2777] text-white shadow-md shadow-[#DB2777]/25 transform scale-105'
                  : 'bg-white/80 text-[#4E3C44] border border-[#FBCFE8] hover:border-[#DB2777]/50 hover:bg-[#FDF2F5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map((item) => {
            const likeInfo = likesState[item.id] || { count: item.initialLikes, liked: false };

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item.id)}
                className="group cursor-pointer glass-card rounded-3xl overflow-hidden border border-[#FBCFE8] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
              >
                {/* Artwork Thumbnail with Hover Effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FCE7ED]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#FBCFE8] text-[11px] font-bold text-[#DB2777] uppercase tracking-wider shadow-xs">
                    {item.categoryLabel}
                  </div>

                  {/* Quick View Hover Prompt */}
                  <div className="absolute inset-0 bg-[#291D22]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-[#DB2777] text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Story</span>
                    </span>
                  </div>
                </div>

                {/* Card Content & Meta */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#291D22] group-hover:text-[#DB2777] transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-[#4E3C44]/80 mt-1 line-clamp-2">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  {/* Card Bottom Meta & Heart Like Button */}
                  <div className="pt-2 border-t border-[#FBCFE8]/50 flex items-center justify-between">
                    <span className="text-[11px] text-[#4E3C44]/65 font-medium">
                      Tanvi’s Archive
                    </span>

                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(e, item.id)}
                      aria-label={`Like ${item.title}`}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                        likeInfo.liked
                          ? 'bg-rose-50 border-rose-300 text-rose-600'
                          : 'bg-white border-[#FBCFE8] text-[#4E3C44] hover:border-[#DB2777] hover:text-[#DB2777]'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform ${
                          likeInfo.liked ? 'fill-rose-500 text-rose-500 scale-110' : ''
                        }`}
                      />
                      <span className="font-mono text-xs">{likeInfo.count}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentArtwork && (
        <ArtworkLightbox
          isOpen={activeLightboxIndex !== null}
          artwork={currentArtwork}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          isLiked={likesState[currentArtwork.id]?.liked || false}
          likeCount={likesState[currentArtwork.id]?.count || currentArtwork.initialLikes}
          onToggleLike={(e) => toggleLike(e, currentArtwork.id)}
        />
      )}
    </section>
  );
}
