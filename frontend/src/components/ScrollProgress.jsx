import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--blue)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 201,
        boxShadow: '0 0 8px var(--blue-glow2)',
      }}
    />
  );
}
