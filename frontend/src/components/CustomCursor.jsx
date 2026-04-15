import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Solo en dispositivos con mouse (no touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const expand = () => {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(59,130,246,0.7)';
      dot.style.background = 'var(--blue-light)';
    };
    const collapse = () => {
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(255,255,255,0.25)';
      dot.style.background = '#fff';
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, label').forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', collapse);
      });
    };

    const loop = () => {
      raf = requestAnimationFrame(loop);
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
    };

    window.addEventListener('mousemove', onMove);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  // No renderizar en touch
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'background 0.2s',
          willChange: 'left, top',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
          willChange: 'left, top',
        }}
      />
    </>
  );
}
