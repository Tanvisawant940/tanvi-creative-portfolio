import React, { useEffect, useState, useRef } from 'react';

/**
 * Custom Artistic Pink Cursor
 * - Small custom pink cursor dot on desktop.
 * - Tiny sparkles/dots that appear briefly on move.
 * - Gentle pulse/expansion on click or interactive hover.
 * - Outer circle completely removed as requested.
 * - Hidden on touch devices and disabled when prefers-reduced-motion is true.
 * - Pointer-events-none so it never blocks clicking or text selection.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [trail, setTrail] = useState([]);

  const cursorDotRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const trailCounter = useRef(0);

  useEffect(() => {
    // Only enable on desktop with pointer
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Add gentle sparkle trail particle every few moves
      trailCounter.current += 1;
      if (trailCounter.current % 5 === 0) {
        const id = Math.random();
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        setTrail((prev) => [
          ...prev.slice(-10),
          { id, x: e.clientX + offsetX, y: e.clientY + offsetY }
        ]);

        setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== id));
        }, 550);
      }
    };

    const onMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 200);
    };

    // Check for interactive element hovering
    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-hover')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Inner pink cursor dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#DB2777] shadow-[0_0_10px_rgba(219,39,119,0.7)] transition-transform duration-75 ease-out ${
          clicked ? 'scale-150 bg-[#be185d]' : isHoveringInteractive ? 'scale-130 bg-[#be185d]' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Tiny sparkles/particles on move */}
      {trail.map((p) => (
        <span
          key={p.id}
          className="fixed w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#F472B6] animate-ping opacity-70"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: 'translate3d(0,0,0)',
          }}
        />
      ))}
    </div>
  );
}
