import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Compass, Undo, Trash2, Download, Eraser, PenTool, Circle, Info } from 'lucide-react';

export default function CraftWorkbench() {
  const [mode, setMode] = useState('mandala'); // 'mandala' | 'lippan'
  const [symmetryAxes, setSymmetryAxes] = useState(8); // 6, 8, 12
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [mirrorSize, setMirrorSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [hasInteracted, setHasInteracted] = useState(false);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  // History stack for Undo
  const historyRef = useRef([]);

  // Mirrors state for Lippan Mode
  const [mirrors, setMirrors] = useState([]);

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
    redrawCanvas();
    saveCanvasState();
  }, [mode, symmetryAxes]);

  // Handle window resize gracefully
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Save image data
      const prevData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      redrawCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode, mirrors]);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (mode === 'mandala') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      historyRef.current.push(imageData);
      if (historyRef.current.length > 20) {
        historyRef.current.shift();
      }
    }
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Clay / handmade paper backdrop
    ctx.fillStyle = mode === 'lippan' ? '#FBF3EB' : '#FFF9FA';
    ctx.fillRect(0, 0, w, h);

    // Subtle guide markings
    const centerX = w / 2;
    const centerY = h / 2;

    ctx.save();
    ctx.strokeStyle = mode === 'lippan' ? 'rgba(219, 140, 110, 0.15)' : 'rgba(219, 39, 119, 0.1)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    if (mode === 'mandala') {
      // Draw symmetry guideline rays
      for (let i = 0; i < symmetryAxes; i++) {
        const angle = (i * Math.PI * 2) / symmetryAxes;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * (w + h), centerY + Math.sin(angle) * (w + h));
        ctx.stroke();
      }
      // Concentric guide circles
      [40, 90, 150, 220].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });
    } else {
      // Lippan geometric grid guide
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Render all placed Lippan mirrors
      mirrors.forEach((m) => {
        renderMirror(ctx, m.x, m.y, m.radius);
      });
    }
    ctx.restore();
  };

  // Render a detailed 3D circular Lippan mirror with clay rim & specular reflection
  const renderMirror = (ctx, x, y, radius) => {
    ctx.save();

    // 1. Shadow beneath clay rim
    ctx.beginPath();
    ctx.arc(x, y + 2, radius + 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(78, 60, 68, 0.12)';
    ctx.fill();

    // 2. Sculpted clay boundary rim (terracotta / off-white relief paste)
    ctx.beginPath();
    ctx.arc(x, y, radius + 3.5, 0, Math.PI * 2);
    const rimGrad = ctx.createRadialGradient(x - 2, y - 2, radius * 0.5, x, y, radius + 4);
    rimGrad.addColorStop(0, '#FFFFFF');
    rimGrad.addColorStop(0.7, '#F3E8E2');
    rimGrad.addColorStop(1, '#D8C5BD');
    ctx.fillStyle = rimGrad;
    ctx.fill();
    ctx.strokeStyle = '#CBB6AD';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Inner reflective mirror glass
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    const mirrorGrad = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
    mirrorGrad.addColorStop(0, '#FFFFFF');
    mirrorGrad.addColorStop(0.35, '#EFF6FF');
    mirrorGrad.addColorStop(0.65, '#E2E8F0');
    mirrorGrad.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = mirrorGrad;
    ctx.fill();

    // 4. Subtle inner bevel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 5. Specular crescent highlight
    ctx.beginPath();
    ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.restore();
  };

  // Pointer position helper
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Pointer Down
  const handlePointerDown = (e) => {
    const { x, y } = getCoordinates(e);
    setHasInteracted(true);

    if (mode === 'mandala') {
      isDrawingRef.current = true;
      lastPointRef.current = { x, y };
    } else if (mode === 'lippan') {
      const radiusMap = { small: 9, medium: 15, large: 22 };
      const newMirror = { x, y, radius: radiusMap[mirrorSize] || 15 };
      setMirrors((prev) => [...prev, newMirror]);
    }
  };

  // Pointer Move (Mandala Drawing)
  const handlePointerMove = (e) => {
    if (mode !== 'mandala' || !isDrawingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const p1 = lastPointRef.current;
    const p2 = { x, y };

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? '#FFF9FA' : '#DB2777';

    // Draw across radial symmetry axes
    for (let i = 0; i < symmetryAxes; i++) {
      const angle = (i * Math.PI * 2) / symmetryAxes;

      // Transform relative to center
      const rotP1 = rotatePoint(p1.x - centerX, p1.y - centerY, angle);
      const rotP2 = rotatePoint(p2.x - centerX, p2.y - centerY, angle);

      ctx.beginPath();
      ctx.moveTo(centerX + rotP1.x, centerY + rotP1.y);
      ctx.lineTo(centerX + rotP2.x, centerY + rotP2.y);
      ctx.stroke();

      // Mirror reflection along radial ray
      const mirrorP1 = { x: -rotP1.x, y: rotP1.y };
      const mirrorP2 = { x: -rotP2.x, y: rotP2.y };
      const rotMirP1 = rotatePoint(mirrorP1.x, mirrorP1.y, angle);
      const rotMirP2 = rotatePoint(mirrorP2.x, mirrorP2.y, angle);

      ctx.beginPath();
      ctx.moveTo(centerX + rotMirP1.x, centerY + rotMirP1.y);
      ctx.lineTo(centerX + rotMirP2.x, centerY + rotMirP2.y);
      ctx.stroke();
    }
    ctx.restore();

    lastPointRef.current = { x, y };
  };

  const rotatePoint = (x, y, angle) => {
    return {
      x: x * Math.cos(angle) - y * Math.sin(angle),
      y: x * Math.sin(angle) + y * Math.cos(angle),
    };
  };

  // Pointer Up
  const handlePointerUp = () => {
    if (mode === 'mandala' && isDrawingRef.current) {
      isDrawingRef.current = false;
      saveCanvasState();
    }
  };

  // Re-render Lippan whenever mirrors list changes
  useEffect(() => {
    if (mode === 'lippan') {
      redrawCanvas();
    }
  }, [mirrors]);

  // Undo Action
  const handleUndo = () => {
    if (mode === 'mandala') {
      if (historyRef.current.length > 1) {
        historyRef.current.pop(); // Remove current
        const prevState = historyRef.current[historyRef.current.length - 1];
        const canvas = canvasRef.current;
        if (canvas && prevState) {
          const ctx = canvas.getContext('2d');
          ctx.putImageData(prevState, 0, 0);
        }
      } else {
        handleClear();
      }
    } else {
      setMirrors((prev) => prev.slice(0, -1));
    }
  };

  // Clear Canvas
  const handleClear = () => {
    if (mode === 'mandala') {
      historyRef.current = [];
      redrawCanvas();
      saveCanvasState();
    } else {
      setMirrors([]);
    }
    setHasInteracted(false);
  };

  // Download artwork
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tanvi-atelier-${mode}-creation.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section id="workbench" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#DB2777] bg-[#FCE7ED] px-4 py-1 rounded-full border border-[#FBCFE8]">
            Interactive Studio Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#291D22] mt-3">
            A Little Studio Magic
          </h2>
          <p className="text-sm sm:text-base text-[#4E3C44]/80 mt-2 font-normal">
            Dip your digital brush into rose-pink ink or press handcrafted mirrors onto an organic clay board. Touch, draw, and play!
          </p>
        </div>

        {/* Workbench Frame */}
        <div className="glass-card rounded-3xl p-5 sm:p-7 border border-[#FBCFE8] shadow-2xl">
          
          {/* Controls Bar: Mode Switcher & Tools */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#FBCFE8]/60">
            
            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-white/80 rounded-2xl border border-[#FBCFE8]">
              <button
                type="button"
                onClick={() => {
                  setMode('mandala');
                  setIsEraser(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'mandala'
                    ? 'bg-[#DB2777] text-white shadow-sm'
                    : 'text-[#4E3C44] hover:text-[#DB2777] hover:bg-[#FDF2F5]'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Mode A: Mandala Symmetry</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('lippan');
                  setIsEraser(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'lippan'
                    ? 'bg-[#DB2777] text-white shadow-sm'
                    : 'text-[#4E3C44] hover:text-[#DB2777] hover:bg-[#FDF2F5]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Mode B: Lippan Mirror Placement</span>
              </button>
            </div>

            {/* Dynamic Controls based on selected mode */}
            <div className="flex flex-wrap items-center gap-3">
              {mode === 'mandala' ? (
                <>
                  {/* Radial Symmetry Axes Selector */}
                  <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-[#FBCFE8] text-xs">
                    <span className="font-semibold text-[#4E3C44]">Axes:</span>
                    {[6, 8, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setSymmetryAxes(num)}
                        className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                          symmetryAxes === num
                            ? 'bg-[#FCE7ED] text-[#DB2777] border border-[#DB2777]'
                            : 'text-[#4E3C44] hover:bg-gray-100'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>

                  {/* Brush Size */}
                  <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#FBCFE8] text-xs">
                    <span className="font-semibold text-[#4E3C44]">Size:</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-16 sm:w-20 accent-[#DB2777] cursor-pointer"
                    />
                    <span className="font-mono text-[#DB2777] w-3">{brushSize}</span>
                  </div>

                  {/* Pen / Eraser Mode */}
                  <button
                    type="button"
                    onClick={() => setIsEraser(!isEraser)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isEraser
                        ? 'bg-[#DB2777] text-white border-[#DB2777]'
                        : 'bg-white/80 text-[#4E3C44] border-[#FBCFE8] hover:border-[#DB2777]'
                    }`}
                  >
                    {isEraser ? <Eraser className="w-3.5 h-3.5" /> : <PenTool className="w-3.5 h-3.5" />}
                    <span>{isEraser ? 'Eraser' : 'Pen'}</span>
                  </button>
                </>
              ) : (
                /* Lippan Mirror Controls */
                <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#FBCFE8] text-xs">
                  <span className="font-semibold text-[#4E3C44]">Mirror Size:</span>
                  {(['small', 'medium', 'large']).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setMirrorSize(size)}
                      className={`capitalize px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        mirrorSize === size
                          ? 'bg-[#FCE7ED] text-[#DB2777] border border-[#DB2777]'
                          : 'text-[#4E3C44] hover:bg-gray-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons: Undo, Clear, Download */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  title="Undo last stroke or mirror"
                  className="p-2 rounded-xl bg-white/80 border border-[#FBCFE8] text-[#4E3C44] hover:text-[#DB2777] hover:border-[#DB2777] transition-colors"
                >
                  <Undo className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear entire canvas"
                  className="p-2 rounded-xl bg-white/80 border border-[#FBCFE8] text-[#4E3C44] hover:text-rose-600 hover:border-rose-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  title="Export your handmade design"
                  className="p-2 rounded-xl bg-white/80 border border-[#FBCFE8] text-[#4E3C44] hover:text-[#DB2777] hover:border-[#DB2777] transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Mode Guidance Instruction Banner */}
          <div className="py-2.5 px-3 flex items-center justify-between text-xs text-[#4E3C44]/80">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#DB2777] shrink-0" />
              <span>
                {mode === 'mandala'
                  ? `Click and drag to draw in rose-pink ink. Strokes will simultaneously mirror across ${symmetryAxes} radial axes.`
                  : 'Click or tap anywhere on the textured clay surface to press a decorative, light-reflecting circular mirror!'}
              </span>
            </div>
            {mode === 'lippan' && (
              <span className="font-semibold text-[#DB2777] shrink-0">
                Mirrors placed: {mirrors.length}
              </span>
            )}
          </div>

          {/* Canvas Board Area */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[560px] rounded-2xl overflow-hidden shadow-inner border border-[#FBCFE8] touch-none select-none bg-white">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-full cursor-crosshair block"
            />

            {/* Polished Empty State Overlay (Disappears upon interaction) */}
            {!hasInteracted && (
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6 text-center bg-white/40 backdrop-blur-[1px]">
                <div className="p-3.5 rounded-full bg-[#FCE7ED] border border-[#FBCFE8] text-[#DB2777] mb-2.5 shadow-sm animate-bounce">
                  {mode === 'mandala' ? <Compass className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                </div>
                <p className="font-serif text-lg sm:text-xl font-bold text-[#291D22]">
                  {mode === 'mandala' ? 'Start Your Sacred Mandala' : 'Place Your First Kutch Mirror'}
                </p>
                <p className="text-xs sm:text-sm text-[#4E3C44]/75 max-w-sm mt-1">
                  {mode === 'mandala'
                    ? 'Glide with your finger, mouse, or pen to weave radial geometry.'
                    : 'Tap on the clay board to place a handcrafted reflective mirror with clay bezel.'}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
