import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { Mesh } from 'three';

interface CalculatorDisplayProps {
  value: string;
  position: [number, number, number];
}

export const CalculatorDisplay = ({ value, position }: CalculatorDisplayProps) => {
  const meshRef = useRef<Mesh>(null);

  // Subtle glow animation
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as any;
      const intensity = 0.4 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      material.emissiveIntensity = intensity;
    }
  });

  return (
    <group position={position}>
      {/* Display background */}
      <RoundedBox
        ref={meshRef}
        args={[3.5, 0.6, 0.05]}
        radius={0.05}
        smoothness={4}
        position={[0, 0, -0.025]}
      >
        <meshPhysicalMaterial
          color="#0a0a0a"
          emissive="#00cccc"
          emissiveIntensity={0.4}
          metalness={0.1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Display border glow */}
      <RoundedBox
        args={[3.6, 0.7, 0.02]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, -0.04]}
      >
        <meshPhysicalMaterial
          color="#4dd0ff"
          emissive="#4dd0ff"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      {/* Display text */}
      <Text
        position={[1.5, 0, 0.03]}
        fontSize={0.25}
        color="#00ffff"
        anchorX="right"
        anchorY="middle"
        font="/fonts/helvetiker_regular.typeface.json"
        maxWidth={3.2}
      >
        {value || '0'}
      </Text>

      {/* Scanlines effect */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh key={i} position={[0, 0.2 - i * 0.1, 0.01]}>
          <planeGeometry args={[3.4, 0.01]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};