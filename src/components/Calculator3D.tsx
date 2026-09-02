import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
} from '@react-three/drei';

import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
} from 'three';

import { CalculatorBody } from './calculator/CalculatorBody';
import { useCalculator } from '../hooks/useCalculator';

export const Calculator3D = () => {
  const calculator = useCalculator();

  return (
    <div className="w-full h-screen bg-[#0f1115]">
      <Canvas
        camera={{
          position: [0, 2, 8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          /*
           * Cinematic / product-render tone mapping.
           *
           * Lower exposure is intentional:
           * it stops shiny materials from producing
           * huge white blown-out reflections.
           */
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.82;
          gl.outputColorSpace = SRGBColorSpace;
        }}
      >
        {/* =========================================================
            BACKGROUND
           ========================================================= */}

        <color attach="background" args={['#0f1115']} />

        {/* =========================================================
            CUSTOM STUDIO ENVIRONMENT

            Instead of Environment preset="studio", we're creating
            our own softbox reflections.

            This gives us much more control over the shiny body.
           ========================================================= */}

        <Environment resolution={256}>
          {/* Large overhead/front softbox */}
          <Lightformer
            form="rect"
            intensity={1.8}
            color="#ffffff"
            position={[0, 5, 5]}
            rotation={[-0.7, 0, 0]}
            scale={[5, 2, 1]}
          />

          {/* Large left-side softbox */}
          <Lightformer
            form="rect"
            intensity={1.1}
            color="#d8efff"
            position={[-5, 1.5, 3]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[5, 3, 1]}
          />

          {/* Right-side soft reflection */}
          <Lightformer
            form="rect"
            intensity={0.8}
            color="#ffffff"
            position={[5, 2, 2]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[4, 3, 1]}
          />

          {/* Top edge reflection */}
          <Lightformer
            form="rect"
            intensity={0.8}
            color="#ffffff"
            position={[0, 6, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[4, 3, 1]}
          />

          {/* Very subtle cyan accent */}
          <Lightformer
            form="rect"
            intensity={0.6}
            color="#4dd0ff"
            position={[-4, 0, -4]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[2, 4, 1]}
          />

          {/* Very subtle purple accent */}
          <Lightformer
            form="rect"
            intensity={0.35}
            color="#9d4edd"
            position={[4, -1, -4]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[2, 3, 1]}
          />
        </Environment>

        {/* =========================================================
            BASE / AMBIENT LIGHT

            Keep this low.
            Its purpose is only to prevent completely black areas.
           ========================================================= */}

        <ambientLight intensity={0.18} />

        <hemisphereLight
          args={[
            '#cdd8e5',
            '#090b0e',
            0.28,
          ]}
        />

        {/* =========================================================
            MAIN KEY LIGHT

            This is intentionally NOT extremely strong.

            The previous strong point light was responsible for the
            bright white circular reflection on the calculator.
           ========================================================= */}

        <directionalLight
          position={[5, 7, 7]}
          intensity={0.9}
          color="#fff9f2"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.00015}
          shadow-normalBias={0.03}
        />

        {/* =========================================================
            SOFT FRONT FILL

            Very low intensity.

            Prevents the calculator buttons/body from becoming
            completely dark without creating a giant hotspot.
           ========================================================= */}

        <rectAreaLight
          position={[-3.5, 2.5, 6]}
          rotation={[-0.25, -0.45, 0]}
          width={4}
          height={5}
          intensity={0.7}
          color="#e8f4ff"
        />

        {/* =========================================================
            RIGHT FILL
           ========================================================= */}

        <rectAreaLight
          position={[4, 1.5, 5]}
          rotation={[-0.2, 0.55, 0]}
          width={3}
          height={5}
          intensity={0.5}
          color="#ffffff"
        />

        {/* =========================================================
            TOP SOFT LIGHT
           ========================================================= */}

        <rectAreaLight
          position={[0, 6, 2]}
          rotation={[-Math.PI / 2, 0, 0]}
          width={5}
          height={4}
          intensity={0.65}
          color="#ffffff"
        />

        {/* =========================================================
            CYAN RIM LIGHT

            Positioned BEHIND the calculator.

            This should mainly hit the edges, rather than putting a
            bright blob directly on the calculator face.
           ========================================================= */}

        <spotLight
          position={[-5, 3, -4]}
          intensity={3}
          color="#4dd0ff"
          distance={15}
          decay={2}
          angle={0.45}
          penumbra={1}
        />

        {/* =========================================================
            PURPLE RIM LIGHT
           ========================================================= */}

        <spotLight
          position={[5, 0, -4]}
          intensity={1.5}
          color="#9d4edd"
          distance={15}
          decay={2}
          angle={0.5}
          penumbra={1}
        />

        {/* =========================================================
            CALCULATOR
           ========================================================= */}

        <CalculatorBody calculator={calculator} />

        {/* =========================================================
            FLOOR / CONTACT SHADOW

            Makes the calculator feel grounded without needing
            a large visible floor mesh.
           ========================================================= */}

        <ContactShadows
          position={[0, -2.55, 0]}
          scale={9}
          opacity={0.28}
          blur={3.5}
          far={5}
          resolution={1024}
        />

        {/* =========================================================
            CAMERA CONTROLS
           ========================================================= */}

        <OrbitControls
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.055}
          minDistance={5}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};