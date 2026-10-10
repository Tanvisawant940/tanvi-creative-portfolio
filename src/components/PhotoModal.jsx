import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Check, AlertCircle, Image as ImageIcon, RotateCcw } from 'lucide-react';

export const presetAvatars = [
  {
    id: 'original',
    name: 'Tanvi (Current Photo)',
    url: '/tanvi.jpg',
    tag: 'Uploaded Portrait'
  },
  {
    id: 'illustrated-sketch',
    name: 'Artisan Sketch',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    tag: 'Illustrated Studio'
  },
  {
    id: 'botanical-creator',
    name: 'Botanical Atelier',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    tag: 'Natural Bloom'
  },
  {
    id: 'clay-artisan',
    name: 'Clay & Relief Studio',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    tag: 'Ceramic Light'
  }
];

export default function PhotoModal({ isOpen, onClose, currentPhoto, onSavePhoto }) {
  const [selectedPhoto, setSelectedPhoto] = useState(currentPhoto);
  const [tempObjectURL, setTempObjectURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedPhoto(currentPhoto);
      setErrorMessage('');
    }
  }, [isOpen, currentPhoto]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean up object URL when component unmounts or closes
  const cleanupObjectURL = () => {
    if (tempObjectURL) {
      URL.revokeObjectURL(tempObjectURL);
      setTempObjectURL(null);
    }
  };

  const handleFileUpload = (e) => {
    setErrorMessage('');
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (.jpg, .png, .webp).');
      return;
    }

    // Validate file size (< 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image size is too large. Please select a photo under 8MB.');
      return;
    }

    try {
      cleanupObjectURL();
      const newUrl = URL.createObjectURL(file);
      setTempObjectURL(newUrl);
      setSelectedPhoto(newUrl);
    } catch (err) {
      setErrorMessage('Failed to read image file. Please try again.');
    }
  };

  const handleConfirm = () => {
    onSavePhoto(selectedPhoto);
    onClose();
  };

  const handleCancel = () => {
    cleanupObjectURL();
    setSelectedPhoto(currentPhoto);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#291D22]/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-[#FFF8FA] border border-[#FBCFE8] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Subtle decorative background bloom */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FCE7ED]/70 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FBCFE8]/60">
          <div>
            <h2 id="photo-modal-title" className="font-serif text-2xl font-bold text-[#291D22]">
              Customize Atelier Portrait
            </h2>
            <p className="text-xs text-[#4E3C44]/75 mt-0.5">
              Personalize Tanvi’s Polaroid portrait in the hero section.
            </p>
          </div>
          <button
            onClick={handleCancel}
            aria-label="Close modal"
            className="p-2 rounded-full text-[#4E3C44] hover:bg-[#FCE7ED] hover:text-[#DB2777] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-6">
          {/* Error message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Current Selection Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-white/70 p-4 rounded-2xl border border-[#FBCFE8]">
            <div className="relative w-28 h-36 rounded-xl overflow-hidden shadow-md border-2 border-white bg-[#FDF2F5] shrink-0">
              <img
                src={selectedPhoto}
                alt="Selected Portrait Preview"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = '/tanvi.jpg';
                }}
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-[#DB2777] bg-[#FCE7ED] rounded-full uppercase">
                Active Preview
              </span>
              <p className="text-sm font-medium text-[#291D22]">
                Instant Live Render
              </p>
              <p className="text-xs text-[#4E3C44]/80">
                This image will appear immediately inside the handcrafted Polaroid frame.
              </p>

              {/* Upload CTA button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white border border-[#DB2777] text-[#DB2777] rounded-xl hover:bg-[#FCE7ED] transition-colors shadow-sm"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Illustrated Preset Avatars */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4E3C44]/80 mb-3">
              Or Choose Curated Atelier Presets:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {presetAvatars.map((preset) => {
                const isCurrent = selectedPhoto === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setSelectedPhoto(preset.url);
                    }}
                    className={`group relative p-2 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'border-[#DB2777] bg-[#FCE7ED] ring-2 ring-[#DB2777]/30'
                        : 'border-[#FBCFE8] bg-white hover:border-[#DB2777]/60'
                    }`}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#FDF2F5] mb-1.5">
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = '/tanvi.jpg';
                        }}
                      />
                    </div>
                    <p className="text-[11px] font-semibold text-[#291D22] truncate">
                      {preset.name}
                    </p>
                    <p className="text-[10px] text-[#DB2777] truncate">
                      {preset.tag}
                    </p>
                    {isCurrent && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-[#DB2777] rounded-full flex items-center justify-center text-white shadow-sm">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#FBCFE8]/60">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#4E3C44] hover:bg-[#FDF2F5] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#DB2777] text-white hover:bg-[#be185d] shadow-[0_4px_14px_rgba(219,39,119,0.3)] transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Photo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
