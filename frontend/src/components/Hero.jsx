import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Resize handler
    const resize = () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating geometric shape
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      emissive: 0x333333,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amb);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // Mouse parallax
    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      mesh.rotation.y += 0.004;
      mesh.rotation.x += 0.002;
      mesh.rotation.y += mouseX * 0.002;
      mesh.rotation.x += mouseY * 0.002;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
    };
  }, []);

  const words = ['Precisión.', 'Creatividad.', 'Forma.'];

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Three.js canvas de fondo */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
      />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: '#666', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '1.5rem' }}
        >
          IMPRESIONES 3D PROFESIONALES
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            marginBottom: '0.5rem',
          }}
        >
          3D<span style={{ color: '#444' }}>.san</span>
        </motion.h1>

        <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
              style={{
                display: 'inline-block',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                color: '#555',
                marginRight: '1rem',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.a
          href="#trabajos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
          style={{
            display: 'inline-block',
            border: '1px solid #444',
            color: '#fff',
            padding: '0.85rem 2.5rem',
            textDecoration: 'none',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            transition: 'all 0.3s',
          }}
        >
          VER TRABAJOS
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #fff, transparent)' }}
        />
      </motion.div>
    </section>
  );
}
