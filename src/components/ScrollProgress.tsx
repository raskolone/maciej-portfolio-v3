import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Change color from an initial color to the brand green as they scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#3b82f6", "#8b5cf6", "#10b981"] // Blue -> Violet -> Emerald/Green
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
      style={{
        scaleX: scrollYProgress,
        backgroundColor,
      }}
    />
  );
}
