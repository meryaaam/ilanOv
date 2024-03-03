"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

function BannerComponent() {
    const fileUrl = "/images/moon.glb";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);
  
    useFrame(() => {
      mesh.current.rotation.y += 0.01;
    });
  
    return (
      <mesh ref={mesh}>
        <primitive object={gltf.scene} />
      </mesh>
    );
  }
  
  export function Banner() {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Canvas className='h-xl w-xl'>
          <OrbitControls />
          <ambientLight />
          <pointLight position={[0, 0, 0]} />
          <BannerComponent />
        </Canvas>
      </div>
    );
  }