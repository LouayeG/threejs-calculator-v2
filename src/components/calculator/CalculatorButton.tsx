import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, Color } from 'three';

export interface CalculatorButtonProps {
  label: string;
  position: [number, number, number];
  type: 'number' | 'operator' | 'equals' | 'clear';
  onClick: () => void;
  size?: [number, number, number]; // [w, h, d]
}

export const CalculatorButton = ({ label, position, type, onClick, size }: CalculatorButtonProps) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  // Final geometry size (defaults, but parent can override via `size`)
  const buttonSize = useMemo<[number, number, number]>(() => {
    if (size) return size;
    return label === '0' ? [1.5, 0.38, 0.13] : [0.5, 0.38, 0.13];
  }, [label, size]);

  const buttonColor = useMemo(() => {
    switch (type) {
      case 'number': return '#334155';
      case 'operator': return '#f59e0b';
      case 'equals': return '#0891b2';
      case 'clear': return '#dc2626';
      default: return '#334155';
    }
  }, [type]);

  const emissiveColor = useMemo(
    () => new Color(buttonColor).multiplyScalar(0.4),
    [buttonColor]
  );

  // Subtle glow pulse on hover
  useFrame((state) => {
    const m: any = meshRef.current?.material;
    if (!m) return;
    m.emissiveIntensity = hovered
      ? 0.3 + Math.sin(state.clock.elapsedTime * 8) * 0.1
      : 0.15;
  });

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    onClick();
  };

  // Keep top faces coplanar; only nudge when pressed
  const buttonPosition: [number, number, number] = [
    position[0],
    position[1],
    position[2] + (pressed ? -0.02 : 0) + buttonSize[2] / 2 + 0.035,
  ];

  return (
    <group position={buttonPosition}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={buttonSize} />
        <meshPhysicalMaterial
          color={buttonColor}
          emissive={emissiveColor}
          emissiveIntensity={hovered ? 0.42 : 0.1}
          metalness={0.18}
          roughness={0.5}
          clearcoat={0.28}
          clearcoatRoughness={0.5}
        />
      </mesh>

      {/* Centered label; Z derived from depth */}
      <Text
        position={[0, 0, buttonSize[2] / 2 + 0.001]}
        fontSize={0.22}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        textAlign="center"
        outlineColor={buttonColor}
        outlineWidth={0.012}
        fontWeight={700}
      >
        {label}
      </Text>
    </group>
  );
};
