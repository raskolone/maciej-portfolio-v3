/* =============================================================
   DESIGN: Dark Constellation — Animated Canvas Background
   Spokojne, autonomiczne gwiazdy krążące w tle — bez interakcji z kursorem.
   ResizeObserver gwarantuje poprawne wymiary canvas przy montowaniu.
   ============================================================= */

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const CONNECTION_DIST = 150;

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme !== "light";

    const initStars = (W: number, H: number) => {
      const isMobile = W < 768;
      const starCount = isMobile ? 50 : 100;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.4 + 0.5,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const W = parent ? parent.clientWidth : window.innerWidth;
      const H = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      initStars(W, H);
    };

    // Use ResizeObserver on parent to catch actual rendered dimensions
    const parent = canvas.parentElement;
    let ro: ResizeObserver | null = null;
    if (parent) {
      ro = new ResizeObserver(() => resize());
      ro.observe(parent);
    }
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      const stars = starsRef.current;

      // Draw connections between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * (isDark ? 0.45 : 0.3);
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(80, 200, 120, ${alpha})`
              : `rgba(20, 110, 50, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw stars
      for (const star of stars) {
        if (isDark) {
          // Soft glow halo
          const glowR = star.radius * 4;
          const grd = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowR);
          grd.addColorStop(0, `rgba(255,255,255,${star.opacity * 0.5})`);
          grd.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,40,20,${star.opacity * 0.7})`;
          ctx.fill();
        }

        // Move
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around edges
        if (star.x < 0) star.x = W;
        if (star.x > W) star.x = 0;
        if (star.y < 0) star.y = H;
        if (star.y > H) star.y = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      if (ro) ro.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
