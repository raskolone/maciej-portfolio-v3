import { useEffect, useRef } from "react";

/**
 * useRevealAnimation
 * Modified to rely on GSAP for animations.
 * Returns ref for compatibility.
 */
export function useRevealAnimation(staggerMs = 130) {
  const ref = useRef<HTMLElement>(null);
  // Observer logic removed - GSAP handles it globally in Home.tsx
  return ref;
}
