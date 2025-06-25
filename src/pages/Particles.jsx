// src/three/Particles.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Particles = ({ count = 500, theme = 'dark' }) => {
  const points = useRef();
  
  useFrame((state, delta) => {
    points.current.rotation.x += delta * 0.1;
    points.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry attach="geometry" />
      <pointsMaterial
        attach="material"
        size={0.015}
        color={theme === 'dark' ? '#ffffff' : '#000000'}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
};

export default Particles;