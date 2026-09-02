import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { Mesh } from 'three';

interface CalculatorDisplayProps {
  value: string;
  position: [number, number, number];
}

const calculatorFont = 'https://fonts.gstatic.com/s/sharetechmono/v16/J7aHnp1uDWRBEqV98dVQztYldFc7pA.ttf';

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
      {/* Futuristic rounded display background */}
  <RoundedBox
    args={[3.6, 0.65, 0.09]}
    radius={0.18}
    smoothness={6}
    position={[0, 0, -0.025]}
  >
    <meshPhysicalMaterial
      color="#5f735a"
      emissive="#172a18"
      emissiveIntensity={0.05}
      metalness={0.02}
      roughness={0.72}
      clearcoat={0.12}
      clearcoatRoughness={0.7}
    />
  </RoundedBox>

      {/* Display border glow */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[3.7, 0.75, 0.01]} />
        <meshBasicMaterial
          color="#182816"
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Display text with outline and glow */}
      <Text
          fontSize={0.32}
          font={calculatorFont}
          color="#101810"
          anchorX="right"
          anchorY="middle"
          position={[1.6, 0, 0.05]}
          letterSpacing={0.03}
        >
        {value || '0'}
      </Text>

      {/* Scanlines effect for retro glow */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[0, 0.25 - i * 0.08, 0.02]}>
          <planeGeometry args={[3.4, 0.008]} />
          <meshBasicMaterial
            color="#192719"
            transparent
            opacity={0.12}
          />
        </mesh>
      ))}
    </group>
  );
};
