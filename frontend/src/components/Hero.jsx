import { Suspense, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

function BenchyModel() {
  const obj = useLoader(OBJLoader, '/models/benchy.obj');
  const groupRef = useRef();
  const mouse = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const rot = useRef({ x: Math.PI / 2, y: Math.PI / 2 });

  const [modelScale, modelPosition] = useMemo(() => {
    // Resetear transforms previos del objeto cacheado antes de medir
    obj.scale.set(1, 1, 1);
    obj.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    box.getSize(size);
    const s = 3 / Math.max(size.x, size.y, size.z);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [s, [-center.x * s, -center.y * s, -center.z * s]];
  }, [obj]);

  useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: '#aaaaaa',
      roughness: 0.5,
      metalness: 0.2,
    });
    obj.traverse(child => {
      if (child.isMesh) child.material = mat;
    });
  }, [obj]);

  useEffect(() => {
    const onMouse = (e) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 3;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 3;
    };
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    const m = mouse.current;
    m.currentX += (m.targetX - m.currentX) * 0.05;
    m.currentY += (m.targetY - m.currentY) * 0.05;
    groupRef.current.position.x = m.currentX * 0.4;
    groupRef.current.position.y = m.currentY * 0.4;
    rot.current.y += 0.005;
    rot.current.x += 0.002;
    groupRef.current.rotation.y = rot.current.y;
    groupRef.current.rotation.x = rot.current.x;
  });

  return (
    <group ref={groupRef}>
      <primitive object={obj} scale={modelScale} position={modelPosition} />
    </group>
  );
}

export default function Hero() {
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
      <div className="hero-canvas" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <directionalLight position={[-5, -3, 2]} intensity={0.5} color="#8888ff" />

          <Suspense fallback={
            <Html center>
              <p style={{ color: '#333', fontSize: '0.7rem', letterSpacing: '0.3em', margin: 0 }}>CARGANDO</p>
            </Html>
          }>
            <BenchyModel />
          </Suspense>
        </Canvas>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

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
            color: '#6699ff',
            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
            letterSpacing: '0.4em',
            marginTop: '1rem',
          }}
        >
          IMPRESIÓN Y DISEÑO 3D
        </motion.p>
      </div>

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
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
            margin: '0 auto',
          }}
        />
      </motion.div>
    </section>
  );
}
