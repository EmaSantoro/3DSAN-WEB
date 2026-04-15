import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Hero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(w, h);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ── Geometría principal: icosaedro facetado ──
    const geo = new THREE.IcosahedronGeometry(1.8, 0);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x111111,
      emissive: 0x111111,
      specular: 0xffffff,
      shininess: 80,
      wireframe: false,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe encima
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
    const wire = new THREE.Mesh(geo, wireMat);
    scene.add(wire);

    // ── Luces ──
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const light1 = new THREE.PointLight(0xffffff, 2, 20);
    light1.position.set(4, 4, 4);
    scene.add(light1);
    const light2 = new THREE.PointLight(0x8888ff, 1, 20);
    light2.position.set(-4, -2, 2);
    scene.add(light2);

    // ── Mouse: la pieza sigue suavemente al cursor ──
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouse = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 3;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 3;
    };
    window.addEventListener('mousemove', onMouse);

    // ── Resize ──
    const onResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ── Animación ──
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // Lerp suave hacia la posición del mouse
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      mesh.position.x = currentX * 0.4;
      mesh.position.y = currentY * 0.4;
      wire.position.copy(mesh.position);

      mesh.rotation.y += 0.005;
      mesh.rotation.x += 0.002;
      wire.rotation.copy(mesh.rotation);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

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
      {/* Canvas Three.js ocupa todo el fondo */}
      <div
        ref={mountRef}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      />

      {/* Overlay gradiente para legibilidad del texto */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Nombre de la empresa — centro */}
      <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', userSelect: 'none' }}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(5rem, 16vw, 14rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 80px rgba(255,255,255,0.08)',
          }}
        >
          3DSAN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            color: '#555',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            letterSpacing: '0.4em',
            marginTop: '1rem',
          }}
        >
          IMPRESION Y DISEÑO 3D
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)', margin: '0 auto' }}
        />
      </motion.div>
    </section>
  );
}
