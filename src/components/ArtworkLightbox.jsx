import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Clock, Layers, BookOpen } from 'lucide-react';

export default function ArtworkLightbox({
  isOpen,
  artwork,
  onClose,
  onPrev,
  onNext,
  isLiked,
  likeCount,
  onToggleLike,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !artwork) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#291D22]/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FFF8FA] rounded-3xl overflow-hidden shadow-2xl border border-[#FBCFE8] flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close artwork details"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#4E3C44] hover:text-[#DB2777] shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous & Next Navigation Arrows (Floating) */}
        <button
          onClick={onPrev}
          aria-label="Previous artwork"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 text-[#4E3C44] hover:text-[#DB2777] shadow-lg transition-transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          aria-label="Next artwork"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 text-[#4E3C44] hover:text-[#DB2777] shadow-lg transition-transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Column: Enlarged Artwork Image */}
        <div className="lg:w-7/12 relative bg-[#FCE7ED] overflow-hidden flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover max-h-[55vh] lg:max-h-[90vh]"
          />
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#FBCFE8] text-xs font-semibold text-[#DB2777] uppercase tracking-wider shadow-sm">
            {artwork.categoryLabel}
          </div>
        </div>

        {/* Right Column: Detailed Story, Materials, & Illustrative Metrics */}
        <div className="lg:w-5/12 p-6 sm:p-8 overflow-y-auto max-h-[45vh] lg:max-h-[90vh] space-y-6">
          {/* Header */}
          <div className="space-y-1.5 border-b border-[#FBCFE8]/60 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DB2777]">
              Handcrafted Artwork
            </span>
            <h3 id="lightbox-title" className="font-serif text-2xl sm:text-3xl font-bold text-[#291D22]">
              {artwork.title}
            </h3>
            {artwork.caption && (
              <p className="text-xs sm:text-sm text-[#4E3C44]/80 italic font-display">
                “{artwork.caption}”
              </p>
            )}
          </div>

          {/* Artwork Story */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#291D22] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#DB2777]" />
              <span>The Creative Story</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#4E3C44] leading-relaxed">
              {artwork.story}
            </p>
          </div>

          {/* Materials Used */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#291D22] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#DB2777]" />
              <span>Materials Used</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#4E3C44]/85 bg-white p-3 rounded-xl border border-[#FBCFE8]">
              {artwork.materials}
            </p>
          </div>

          {/* Time Spent (Clearly labeled illustrative sample) */}
          <div className="space-y-1.5 bg-[#FCE7ED]/60 p-3.5 rounded-xl border border-[#FBCFE8]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#DB2777] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Studio Craft Time</span>
            </div>
            <p className="text-xs font-semibold text-[#291D22]">
              {artwork.timeSpent}
            </p>
            <p className="text-[10px] text-[#4E3C44]/70">
              *Illustrative sample log for portfolio demonstration until Tanvi's exact studio records are updated.
            </p>
          </div>

          {/* Like Interaction inside Modal */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onToggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                isLiked
                  ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm'
                  : 'bg-white border-[#FBCFE8] text-[#4E3C44] hover:border-[#DB2777]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{isLiked ? 'Loved by you' : 'Leave a heart'}</span>
              <span className="font-mono ml-1 font-bold">({likeCount})</span>
            </button>

            <span className="text-[11px] text-[#4E3C44]/60">
              Use ← → to navigate
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
