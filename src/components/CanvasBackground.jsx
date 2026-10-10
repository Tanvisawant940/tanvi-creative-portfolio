import React, { useEffect, useRef } from 'react';

/**
 * Animated Canvas Background with delicate baby-pink dots and floating petals.
 * Conforms to all Section 3 requirements:
 * - 1.1 - 1.7px particle radii
 * - Organic harmonic sine waves & curling vortex
 * - rgba(244, 114, 182, alpha) soft pink opacity
 * - Interactive mouse displacement ripple
 * - Retina/high-DPI scaling, resize handling
 * - Mobile density reduction
 * - VisibilityState pausing
 * - prefers-reduced-motion check
 */
export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000, radius: 120 };
    let time = 0;
    let isPaused = false;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const initParticles = () => {
      const isMobile = window.innerWidth < 768;
      // Density: ~1 particle per 9000px on desktop, reduced on mobile
      const densityDivisor = isMobile ? 18000 : 9500;
      const count = Math.max(30, Math.min(180, Math.floor((width * height) / densityDivisor)));

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originX: Math.random() * width,
          originY: Math.random() * height,
          radius: 1.1 + Math.random() * 0.6, // 1.1 - 1.7px
          alpha: 0.15 + Math.random() * 0.45,
          baseAlpha: 0.15 + Math.random() * 0.45,
          freqX: 0.0006 + Math.random() * 0.0012,
          freqY: 0.0008 + Math.random() * 0.0014,
          speed: 0.3 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          vortexAngle: Math.random() * Math.PI * 2,
          vortexRadius: 15 + Math.random() * 35,
        });
      }
    };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      initParticles();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isPaused) {
        time += prefersReducedMotion ? 0.002 : 0.016;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          if (!prefersReducedMotion) {
            // Harmonic curling movement
            const harmonicX = Math.sin(time * p.speed + p.phase) * 22;
            const harmonicY = Math.cos(time * p.speed * 0.8 + p.phase) * 18;
            
            // Vortex curl component
            p.vortexAngle += 0.004 * p.speed;
            const vortexX = Math.cos(p.vortexAngle) * (p.vortexRadius * 0.25);
            const vortexY = Math.sin(p.vortexAngle) * (p.vortexRadius * 0.25);

            let targetX = p.originX + harmonicX + vortexX;
            let targetY = p.originY + harmonicY + vortexY;

            // Mouse displacement ripple
            const dx = targetX - mouse.x;
            const dy = targetY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 35;
              const angle = Math.atan2(dy, dx);
              targetX += Math.cos(angle) * force;
              targetY += Math.sin(angle) * force;
              p.alpha = Math.min(0.85, p.baseAlpha + 0.35);
            } else {
              p.alpha += (p.baseAlpha - p.alpha) * 0.05;
            }

            p.x += (targetX - p.x) * 0.08;
            p.y += (targetY - p.y) * 0.08;
          } else {
            p.x = p.originX;
            p.y = p.originY;
          }

          // Render particle: soft pink rgba(244, 114, 182, alpha)
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
          ctx.fill();

          // Connect very nearby points with gossamer hairline
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
            if (distSq < 2800) { // ~52px
              const lineAlpha = (1 - Math.sqrt(distSq) / 53) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(244, 114, 182, ${lineAlpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* HTML5 Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Lightweight CSS drifting floral petals and delicate sparkle overlays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Petal 1 */}
        <div
          className="absolute text-pink-300/40 animate-drift-petal"
          style={{ left: '12%', animationDuration: '18s', animationDelay: '0s' }}
        >
          <svg className="w-5 h-5 fill-current rotate-12" viewBox="0 0 24 24">
            <path d="M12 2C8.5 7.5 4 11 4 15.5 4 19.1 7.1 22 10.7 22c2.6 0 4.9-1.5 5.9-3.7C19.8 15.3 20 8.6 12 2z" opacity="0.6"/>
          </svg>
        </div>
        {/* Petal 2 */}
        <div
          className="absolute text-pink-400/30 animate-drift-petal"
          style={{ left: '68%', animationDuration: '22s', animationDelay: '4s' }}
        >
          <svg className="w-4 h-4 fill-current -rotate-45" viewBox="0 0 24 24">
            <path d="M12 2C8.5 7.5 4 11 4 15.5 4 19.1 7.1 22 10.7 22c2.6 0 4.9-1.5 5.9-3.7C19.8 15.3 20 8.6 12 2z" opacity="0.5"/>
          </svg>
        </div>
        {/* Petal 3 */}
        <div
          className="absolute text-pink-300/35 animate-drift-petal"
          style={{ left: '38%', animationDuration: '26s', animationDelay: '9s' }}
        >
          <svg className="w-4 h-4 fill-current rotate-90" viewBox="0 0 24 24">
            <path d="M12 2C8.5 7.5 4 11 4 15.5 4 19.1 7.1 22 10.7 22c2.6 0 4.9-1.5 5.9-3.7C19.8 15.3 20 8.6 12 2z" opacity="0.5"/>
          </svg>
        </div>
        {/* Subtle decorative corner sparkles */}
        <div className="absolute top-1/4 right-[8%] w-2 h-2 bg-pink-400/30 rounded-full animate-sparkle" />
        <div className="absolute top-2/3 left-[6%] w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-sparkle" style={{ animationDelay: '1.2s' }} />
      </div>
    </>
  );
}
