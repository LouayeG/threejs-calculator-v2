import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { CalculatorBody } from './calculator/CalculatorBody';
import { useCalculator } from '../hooks/useCalculator';

export const Calculator3D = () => {
  const calculator = useCalculator();

  return (
    <div className="w-full h-screen bg-background">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        shadows
        className="w-full h-full"
      >
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#4dd0ff" />
        <pointLight position={[-5, 0, 5]} intensity={0.2} color="#9d4edd" />
        
        <CalculatorBody calculator={calculator} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};