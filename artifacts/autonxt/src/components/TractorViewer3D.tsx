import { Suspense, useRef, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds, useBounds } from "@react-three/drei";
import type { Group } from "three";
import tractor1 from "@assets/1_1777731255751.png";
import { motion } from "framer-motion";

/* ── Detect WebGL support ── */
function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
  } catch { return false; }
}

/* ── Error boundary ── */
class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

/* ── Trigger Bounds.refresh() once the model is mounted ── */
function FitCamera() {
  const api = useBounds();
  useEffect(() => { api.refresh().fit(); }, [api]);
  return null;
}

/* ── Animated model inside Bounds ── */
function TractorModel() {
  const { scene } = useGLTF("/tractor-model.glb");
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.28;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.06;
  });

  return (
    <Bounds fit clip observe margin={1.05}>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
      <FitCamera />
    </Bounds>
  );
}

/* ── Flat image fallback ── */
function FallbackImage({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.img
        src={tractor1}
        alt="AutoNxt X45H2"
        className="w-full max-w-lg mx-auto drop-shadow-2xl"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Exported component ── */
export default function TractorViewer3D({ className = "" }: { className?: string }) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  useEffect(() => { setWebglOk(supportsWebGL()); }, []);

  if (webglOk === null || !webglOk) return <FallbackImage className={className} />;

  return (
    <ThreeErrorBoundary fallback={<FallbackImage className={className} />}>
      <div className={className} style={{ cursor: "grab" }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 8, 6]} intensity={2.2} castShadow color="#fff8f0" />
          <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#93c5fd" />
          <spotLight
            position={[0, 7, 3]}
            angle={0.4}
            penumbra={1}
            intensity={1.8}
            castShadow
          />
          <pointLight position={[2, -1, 3]} intensity={0.9} color="hsl(0,72%,40%)" />

          <Suspense fallback={null}>
            <TractorModel />
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.5}
              scale={10}
              blur={3.5}
              far={5}
              color="#1a1a1a"
            />
            <Environment preset="studio" />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 5}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={false}
            dampingFactor={0.06}
            enableDamping
          />
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
}

useGLTF.preload("/tractor-model.glb");
