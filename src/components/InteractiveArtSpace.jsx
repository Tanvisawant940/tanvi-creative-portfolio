import React, { useState, useRef, useEffect } from 'react';
import { Compass, PenTool, Undo, Trash2, Eraser, Sparkles, Download, Info } from 'lucide-react';

export default function InteractiveArtSpace() {
  const [mode, setMode] = useState('mandala'); // 'mandala' | 'free'
  const [symmetryAxes, setSymmetryAxes] = useState(8); // 6, 8, 12
  const [brushSize, setBrushSize] = useState(3);
  const [selectedColor, setSelectedColor] = useState('#DB2777'); // Main pink default
  const [isEraser, setIsEraser] = useState(false);
  const [stampMode, setStampMode] = useState('none'); // 'none' | 'pearl' | 'mirror-diamond' | 'mirror-circle'
  const [showGuides, setShowGuides] = useState(true);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  // History stack for Undo
  const historyRef = useRef([]);

  // Soft pink shades, pearl, mirror and charcoal color palette
  const colorPalette = [
    { name: 'Main Pink', value: '#DB2777' },
    { name: 'Soft Rose', value: '#F472B6' },
    { name: 'Blush', value: '#F9A8D4' },
    { name: 'Deep Berry', value: '#9D174D' },
    { name: 'Pearl White', value: '#FFF5F7' },
    { name: 'Charcoal', value: '#291D22' },
    { name: 'Gold Ochre', value: '#D97706' },
  ];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    clearCanvasBackground(ctx, rect.width, rect.height);
    saveState();
  }, []);

  const clearCanvasBackground = (ctx, w, h) => {
    ctx.fillStyle = '#FFF8FA';
    ctx.fillRect(0, 0, w, h);
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(imgData);
    if (historyRef.current.length > 25) {
      historyRef.current.shift();
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || historyRef.current.length <= 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Pop current state
    historyRef.current.pop();
    const previousState = historyRef.current[historyRef.current.length - 1];
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    clearCanvasBackground(ctx, rect.width, rect.height);
    historyRef.current = [];
    saveState();
  };

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Render pearl or mirror shape at (x, y)
  const drawStamp = (ctx, x, y, type, radius) => {
    ctx.save();
    if (type === 'pearl') {
      // Shimmering pearl bead
      const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 1, x, y, radius);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.6, '#FDE8EE');
      grad.addColorStop(1, '#E8C5D0');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(219, 39, 119, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (type === 'mirror-circle') {
      // Circular reflective mirror with clay border
      ctx.beginPath();
      ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
      ctx.fillStyle = '#EAD8CE';
      ctx.fill();

      const mirrorGrad = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
      mirrorGrad.addColorStop(0, '#FFFFFF');
      mirrorGrad.addColorStop(0.5, '#E2E8F0');
      mirrorGrad.addColorStop(1, '#CBD5E1');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = mirrorGrad;
      ctx.fill();
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    } else if (type === 'mirror-diamond') {
      // Diamond mirror
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.rect(-radius, -radius, radius * 2, radius * 2);
      const mirrorGrad = ctx.createLinearGradient(-radius, -radius, radius, radius);
      mirrorGrad.addColorStop(0, '#FFFFFF');
      mirrorGrad.addColorStop(0.5, '#E2E8F0');
      mirrorGrad.addColorStop(1, '#94A3B8');
      ctx.fillStyle = mirrorGrad;
      ctx.fill();
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  };

  const startDrawing = (e) => {
    e.preventDefault();
    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastPointRef.current = coords;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (stampMode !== 'none') {
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (mode === 'mandala') {
        const dx = coords.x - centerX;
        const dy = coords.y - centerY;
        const r = Math.sqrt(dx * dx + dy * dy);
        const baseAngle = Math.atan2(dy, dx);

        for (let i = 0; i < symmetryAxes; i++) {
          const angle = baseAngle + (i * 2 * Math.PI) / symmetryAxes;
          const sx = centerX + Math.cos(angle) * r;
          const sy = centerY + Math.sin(angle) * r;
          drawStamp(ctx, sx, sy, stampMode, brushSize * 2.5);
        }
      } else {
        drawStamp(ctx, coords.x, coords.y, stampMode, brushSize * 2.5);
      }
    }
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    if (stampMode !== 'none') return; // stamps place on click/tap

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    const prev = lastPointRef.current;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;

    if (isEraser) {
      ctx.strokeStyle = '#FFF8FA';
      ctx.lineWidth = brushSize * 3;
    } else {
      ctx.strokeStyle = selectedColor;
    }

    if (mode === 'free') {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else {
      // Mandala symmetry stroke
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      for (let i = 0; i < symmetryAxes; i++) {
        const angle = (i * 2 * Math.PI) / symmetryAxes;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);

        // Standard segment
        const p1x = prev.x - centerX;
        const p1y = prev.y - centerY;
        const p2x = coords.x - centerX;
        const p2y = coords.y - centerY;

        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.stroke();

        // Mirrored reflection across local axis
        ctx.beginPath();
        ctx.moveTo(p1x, -p1y);
        ctx.lineTo(p2x, -p2y);
        ctx.stroke();

        ctx.restore();
      }
    }

    ctx.restore();
    lastPointRef.current = coords;
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveState();
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tanvi-atelier-artwork-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="art-space" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle as requested */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Interactive Drawing Area
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            A Little Space to Create
          </h2>
          <p className="text-base sm:text-lg text-[#4E3C44]/80 mt-3 font-normal italic font-display">
            “Take a moment, draw something, and let your creativity flow.”
          </p>
        </div>

        {/* Studio Canvas Workbench */}
        <div className="glass-card rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#FBCFE8] shadow-2xl space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#FBCFE8]/60">
            {/* Mode Switcher: Mandala vs Free Drawing */}
            <div className="flex items-center gap-2 bg-[#FCE7ED]/70 p-1 rounded-2xl border border-[#FBCFE8]">
              <button
                type="button"
                onClick={() => {
                  setMode('mandala');
                  setStampMode('none');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  mode === 'mandala'
                    ? 'bg-[#DB2777] text-white shadow-sm'
                    : 'text-[#4E3C44] hover:text-[#DB2777]'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Mandala Mode</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('free');
                  setStampMode('none');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  mode === 'free'
                    ? 'bg-[#DB2777] text-white shadow-sm'
                    : 'text-[#4E3C44] hover:text-[#DB2777]'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>Free Drawing Mode</span>
              </button>
            </div>

            {/* Undo, Clear & Save Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUndo}
                title="Undo last stroke"
                className="p-2.5 rounded-xl bg-white border border-[#FBCFE8] text-[#4E3C44] hover:text-[#DB2777] hover:bg-[#FDF2F5] transition-colors"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                title="Clear canvas"
                className="p-2.5 rounded-xl bg-white border border-[#FBCFE8] text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                title="Save your creation"
                className="px-4 py-2 rounded-xl bg-white border border-[#DB2777] text-[#DB2777] hover:bg-[#FCE7ED] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Artwork</span>
              </button>
            </div>
          </div>

          {/* Tool Options (Symmetry, Colors, Brush, Pearl & Mirrors) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Mandala Symmetry Axes (Only active in mandala mode) */}
            {mode === 'mandala' && (
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#291D22]">
                  Symmetry:
                </span>
                <div className="flex items-center gap-1.5">
                  {[6, 8, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSymmetryAxes(num)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        symmetryAxes === num
                          ? 'bg-[#DB2777] text-white border-[#DB2777]'
                          : 'bg-white text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                      }`}
                    >
                      {num} Axes
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Palette Selector */}
            <div className={mode === 'mandala' ? 'md:col-span-4' : 'md:col-span-6'}>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#291D22]">
                  Ink:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {colorPalette.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => {
                        setSelectedColor(col.value);
                        setIsEraser(false);
                      }}
                      title={col.name}
                      style={{ backgroundColor: col.value }}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        !isEraser && selectedColor === col.value
                          ? 'scale-125 border-[#291D22] shadow-sm'
                          : 'border-white hover:scale-110 shadow-xs'
                      }`}
                    />
                  ))}
                  {/* Eraser */}
                  <button
                    type="button"
                    onClick={() => setIsEraser(!isEraser)}
                    title="Eraser tool"
                    className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                      isEraser
                        ? 'bg-[#DB2777] text-white border-[#DB2777]'
                        : 'bg-white text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Brush Size Slider */}
            <div className={mode === 'mandala' ? 'md:col-span-4' : 'md:col-span-6'}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#291D22] whitespace-nowrap">
                  Size: {brushSize}px
                </span>
                <input
                  type="range"
                  min="1"
                  max="18"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-[#DB2777] cursor-pointer"
                />
              </div>
            </div>

            {/* Pearl & Mirror Shapes Options (Lippan / Decorative Inlays) */}
            <div className="md:col-span-12 pt-2 border-t border-[#FBCFE8]/40 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DB2777] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Inlays:</span>
              </span>
              <button
                type="button"
                onClick={() => setStampMode(stampMode === 'pearl' ? 'none' : 'pearl')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  stampMode === 'pearl'
                    ? 'bg-[#DB2777] text-white border-[#DB2777]'
                    : 'bg-white text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                }`}
              >
                Pearl Beads
              </button>
              <button
                type="button"
                onClick={() => setStampMode(stampMode === 'mirror-circle' ? 'none' : 'mirror-circle')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  stampMode === 'mirror-circle'
                    ? 'bg-[#DB2777] text-white border-[#DB2777]'
                    : 'bg-white text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                }`}
              >
                Round Mirror
              </button>
              <button
                type="button"
                onClick={() => setStampMode(stampMode === 'mirror-diamond' ? 'none' : 'mirror-diamond')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  stampMode === 'mirror-diamond'
                    ? 'bg-[#DB2777] text-white border-[#DB2777]'
                    : 'bg-white text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                }`}
              >
                Diamond Mirror
              </button>
              {stampMode !== 'none' && (
                <span className="text-[11px] text-[#DB2777] font-medium ml-2">
                  (Click canvas to place mirror/pearl)
                </span>
              )}
            </div>

          </div>

          {/* Interactive HTML5 Canvas Container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#FFF8FA] border-2 border-[#FBCFE8] shadow-inner select-none cursor-crosshair">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full block touch-none"
            />
          </div>

          {/* Instructions note required by prompt */}
          <div className="flex items-center gap-2 p-3 bg-[#FCE7ED]/50 border border-[#FBCFE8] rounded-xl text-xs text-[#4E3C44]/85">
            <Info className="w-4 h-4 text-[#DB2777] shrink-0" />
            <p>
              <strong>How to draw:</strong> Click or touch and drag on the canvas to draw. In Mandala Mode, each stroke is mirrored across your chosen symmetry axes. Switch to Free Drawing to sketch freely, or select Pearl / Mirror to add shiny Lippan inlays!
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
