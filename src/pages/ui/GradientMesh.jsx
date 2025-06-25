import React from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, GradientTexture } from '@react-three/drei';

const GradientMesh = () => {
  return (
    <div className="gradient-mesh">
      <Canvas>
        <mesh>
          <planeGeometry args={[100, 100]} />
          <MeshDistortMaterial
            distort={0.5}
            speed={2}
            side={0}
          >
            <GradientTexture
              stops={[0, 0.5, 1]}
              colors={['#ff008c', '#9000ff', '#00b3ff']}
              size={100}
            />
          </MeshDistortMaterial>
        </mesh>
      </Canvas>
    </div>
  );
};

export default GradientMesh;