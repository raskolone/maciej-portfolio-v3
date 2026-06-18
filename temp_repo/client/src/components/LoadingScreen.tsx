/* =============================================================
   DESIGN: Cribro Loading Screen — Sieve Animation
   Dark bg, animated sieve filtering particles → CRIBRO text
   Skip on click. Shows once per session (sessionStorage).
   ============================================================= */
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [phase, setPhase] = useState<"sieve" | "text" | "fade">("sieve");
  const [opacity, setOpacity] = useState(1);

  const DURATION = 3000; // 3 seconds total

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    // Particles — start above the sieve, fall through
    const PARTICLE_COUNT = 120;
    type Particle = {
      x: number;
      y: number;
      vy: number;
      vx: number;
      r: number;
      opacity: number;
      passed: boolean; // passed through sieve
      color: string;
    };

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: cx - 160 + Math.random() * 320,
      y: cy - 220 - Math.random() * 200,
      vy: 0.8 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.5,
      passed: false,
      color: i % 5 === 0 ? "#4ade80" : "#ffffff",
    }));

    const SIEVE_Y = cy - 20;
    const SIEVE_W = 280;
    const SIEVE_H = 14;
    const HOLE_SIZE = 6; // particles smaller than this pass through
    const HOLES = 18;

    startTimeRef.current = performance.now();

    const draw = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      // === SIEVE ===
      const sieveAlpha = progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.3);
      ctx.save();
      ctx.globalAlpha = sieveAlpha;

      // Sieve frame — metallic dark green border
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#4ade80";
      ctx.shadowBlur = 12;
      ctx.strokeRect(cx - SIEVE_W / 2, SIEVE_Y - SIEVE_H / 2, SIEVE_W, SIEVE_H);

      // Sieve holes
      const holeSpacing = SIEVE_W / HOLES;
      for (let i = 0; i < HOLES; i++) {
        const hx = cx - SIEVE_W / 2 + holeSpacing * i + holeSpacing / 2;
        ctx.clearRect(hx - HOLE_SIZE / 2, SIEVE_Y - SIEVE_H / 2 + 2, HOLE_SIZE, SIEVE_H - 4);
        // Re-draw hole outline
        ctx.strokeStyle = "rgba(74,222,128,0.3)";
        ctx.lineWidth = 0.5;
        ctx.shadowBlur = 0;
        ctx.strokeRect(hx - HOLE_SIZE / 2, SIEVE_Y - SIEVE_H / 2 + 2, HOLE_SIZE, SIEVE_H - 4);
      }
      ctx.restore();

      // === PARTICLES ===
      particles.forEach((p) => {
        if (progress < 0.65) {
          // Move particles
          p.y += p.vy;
          p.x += p.vx;

          // Check if hitting sieve
          if (!p.passed && p.y >= SIEVE_Y - SIEVE_H / 2 && p.y <= SIEVE_Y + SIEVE_H / 2) {
            // Check if near a hole
            const relX = p.x - (cx - SIEVE_W / 2);
            const holeIdx = Math.floor(relX / (SIEVE_W / HOLES));
            const hx = cx - SIEVE_W / 2 + (SIEVE_W / HOLES) * holeIdx + (SIEVE_W / HOLES) / 2;
            const distToHole = Math.abs(p.x - hx);

            if (distToHole < HOLE_SIZE / 2 && p.r < HOLE_SIZE / 2 + 1) {
              p.passed = true; // passes through
            } else if (!p.passed && p.y > SIEVE_Y - SIEVE_H / 2) {
              // Blocked — bounce slightly
              p.vy = -p.vy * 0.3;
              p.y = SIEVE_Y - SIEVE_H / 2 - p.r;
              p.opacity *= 0.85;
            }
          }

          // Below sieve — continue falling
          if (p.passed && p.y > H + 20) {
            p.y = cy - 220 - Math.random() * 200;
            p.x = cx - 160 + Math.random() * 320;
            p.passed = false;
          }
        }

        // Draw particle
        const pAlpha = progress < 0.7 ? p.opacity : p.opacity * Math.max(0, 1 - (progress - 0.7) / 0.3);
        ctx.save();
        ctx.globalAlpha = pAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        if (p.color === "#4ade80") {
          ctx.shadowColor = "#4ade80";
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.restore();
      });

      // === CRIBRO TEXT — fades in after sieve ===
      if (progress > 0.5) {
        const textAlpha = Math.min(1, (progress - 0.5) / 0.3);
        ctx.save();
        ctx.globalAlpha = textAlpha;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Main CRIBRO text
        ctx.font = `bold ${Math.min(W * 0.12, 96)}px 'Cormorant Garamond', serif`;
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 30;
        ctx.fillText("CRIBRO", cx, cy + 60);

        // Tagline
        ctx.font = `${Math.min(W * 0.025, 18)}px 'DM Mono', monospace`;
        ctx.fillStyle = "#4ade80";
        ctx.shadowBlur = 8;
        ctx.letterSpacing = "0.3em";
        ctx.fillText("less noise. more language.", cx, cy + 100);

        ctx.restore();
      }

      // === SKIP HINT ===
      if (progress > 0.1 && progress < 0.95) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.font = "12px 'DM Mono', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("kliknij aby pominąć", cx, H - 32);
        ctx.restore();
      }

      if (progress >= 1) {
        // Fade out
        setPhase("fade");
        setOpacity(0);
        setTimeout(onComplete, 500);
        return;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [onComplete]);

  const handleSkip = () => {
    cancelAnimationFrame(animRef.current);
    setOpacity(0);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      onClick={handleSkip}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        opacity,
        transition: "opacity 0.4s ease",
        cursor: "pointer",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
