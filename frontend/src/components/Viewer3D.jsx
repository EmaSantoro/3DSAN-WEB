import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

function STLModel({ url }) {
  const geo = useLoader(STLLoader, url);
  geo.computeVertexNormals();
  geo.center();

  const box = new THREE.Box3().setFromBufferAttribute(geo.attributes.position);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = 2 / Math.max(size.x, size.y, size.z);

  return (
    <mesh geometry={geo} scale={scale}>
      <meshStandardMaterial color="#e0e0e0" roughness={0.4} metalness={0.3} />
    </mesh>
  );
}

function OBJModel({ url }) {
  const obj = useLoader(OBJLoader, url);
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  const scale = 2 / Math.max(size.x, size.y, size.z);
  obj.scale.setScalar(scale);
  return <primitive object={obj} />;
}

export default function Viewer3D({ url, height = '400px' }) {
  if (!url) return null;

  const ext = url.split('.').pop().toLowerCase();

  return (
    <div
      style={{
        width: '100%',
        height,
        background: '#0a0a0a',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid #1a1a1a',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.2} />

        <Suspense fallback={null}>
          {ext === 'stl' && <STLModel url={url} />}
          {ext === 'obj' && <OBJModel url={url} />}
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
