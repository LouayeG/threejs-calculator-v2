import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { Group } from 'three';
import { CalculatorButton } from './CalculatorButton';
import { CalculatorDisplay } from './CalculatorDisplay';
import type { UseCalculatorReturn } from '../../hooks/useCalculator';

interface CalculatorBodyProps {
  calculator: UseCalculatorReturn;
}

export const CalculatorBody = ({ calculator }: CalculatorBodyProps) => {
  const groupRef = useRef<Group>(null);

  console.log('CalculatorBody rendering with display:', calculator.display);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

const buttons = [
  { id: 'clear', label: 'C', position: [-1.35,  0.8, 0] as [number, number, number], type: 'clear' as const },
  { id: 'divide', label: '\u00f7', position: [ 1.35,  0.8, 0] as [number, number, number], type: 'operator' as const },

  { id: '7', label: '7', position: [-1.35,  0.3, 0] as [number, number, number], type: 'number' as const },
  { id: '8', label: '8', position: [-0.4,  0.3, 0] as [number, number, number], type: 'number' as const },
  { id: '9', label: '9', position: [ 0.5,  0.3, 0] as [number, number, number], type: 'number' as const },
  { id: 'multiply', label: '\u00d7', position: [ 1.35,  0.3, 0] as [number, number, number], type: 'operator' as const },

  { id: '4', label: '4', position: [-1.35, -0.2, 0] as [number, number, number], type: 'number' as const },
  { id: '5', label: '5', position: [-0.4, -0.2, 0] as [number, number, number], type: 'number' as const },
  { id: '6', label: '6', position: [ 0.5, -0.2, 0] as [number, number, number], type: 'number' as const },
  { id: 'subtract', label: '\u2212', position: [ 1.35, -0.2, 0] as [number, number, number], type: 'operator' as const },

  { id: '1', label: '1', position: [-1.35, -0.7, 0] as [number, number, number], type: 'number' as const },
  { id: '2', label: '2', position: [-0.4, -0.7, 0] as [number, number, number], type: 'number' as const },
  { id: '3', label: '3', position: [ 0.5, -0.7, 0] as [number, number, number], type: 'number' as const },
  { id: 'add', label: '+', position: [ 1.35, -0.7, 0] as [number, number, number], type: 'operator' as const },

  { id: '0', label: '0', position: [-0.85, -1.2, 0] as [number, number, number], type: 'number' as const }, // spans two cells visually
  { id: 'decimal', label: '.', position: [ 0.5, -1.2, 0] as [number, number, number], type: 'number' as const },
  { id: 'equals', label: '=', position: [ 1.35, -1.2, 0] as [number, number, number], type: 'equals' as const },
];

  const handleButtonClick = (id: string, type: string) => {
    switch (type) {
      case 'number':
        calculator.inputNumber(id);
        break;
      case 'operator':
        const operatorMap: { [key: string]: string } = {
          'add': '+',
          'subtract': '-',
          'multiply': '*',
          'divide': '/'
        };
        calculator.inputOperator(operatorMap[id]);
        break;
      case 'equals':
        calculator.calculate();
        break;
      case 'clear':
        calculator.clear();
        break;
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Futuristic rounded calculator body */}
      <RoundedBox
        args={[4.35, 3.85, 0.78]}
        radius={0.35}
        smoothness={8}
        position={[0, 0, -0.3]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#353535"
          metalness={0.12}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={1.25}
          transparent={false}
          opacity={1}
          depthWrite
        />
      </RoundedBox>

      {/* Display */}
      <CalculatorDisplay 
        value={calculator.display} 
        position={[0, 1.4, 0.05]}
      />

      {/* Buttons */}
      {buttons.map((button) => (
        <CalculatorButton
          key={button.id}
          label={button.label}
          position={button.position}
          type={button.type}
          onClick={() => handleButtonClick(button.id, button.type)}
        />
      ))}

      {/* Futuristic branding */}


    </group>
  );
};
