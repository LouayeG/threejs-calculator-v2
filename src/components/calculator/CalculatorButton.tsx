import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { Mesh, Color } from 'three';

interface CalculatorButtonProps {
  label: string;
  position: [number, number, number];
  type: 'number' | 'operator' | 'equals' | 'clear';
  onClick: () => void;
}

export const CalculatorButton = ({ label, position, type, onClick }: CalculatorButtonProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Glow animation
  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as any;
      if (hovered) {
        const intensity = 0.3 + Math.sin(state.clock.elapsedTime * 8) * 0.1;
        material.emissiveIntensity = intensity;
      } else {
        material.emissiveIntensity = 0.1;
      }
    }
  });

  const getButtonColor = () => {
    switch (type) {
      case 'number':
        return '#4dd0ff';
      case 'operator':
        return '#9d4edd';
      case 'equals':
        return '#7ec645';
      case 'clear':
        return '#ff6b6b';
      default:
        return '#4dd0ff';
    }
  };

  const getEmissiveColor = () => {
    const color = new Color(getButtonColor());
    return color.multiplyScalar(0.3);
  };

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    onClick();
  };

  const buttonSize: [number, number, number] = label === '0' ? [1.8, 0.4, 0.1] : [0.8, 0.4, 0.1];
  const buttonPosition: [number, number, number] = [
    position[0],
    position[1],
    position[2] + (pressed ? -0.02 : 0)
  ];

  return (
    <group position={buttonPosition}>
      <RoundedBox
        ref={meshRef}
        args={buttonSize}
        radius={0.05}
        smoothness={4}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
        castShadow
      >
        <meshPhysicalMaterial
          color={getButtonColor()}
          emissive={getEmissiveColor()}
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/helvetiker_bold.typeface.json"
      >
        {label}
      </Text>
    </group>
  );
};