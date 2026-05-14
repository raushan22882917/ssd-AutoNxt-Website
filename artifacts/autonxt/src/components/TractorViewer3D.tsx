import { Suspense, useRef, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import type { Group } from "three";
import tractor1 from "@assets/1_1777731255751.png";
import { motion } from "framer-motion";

/* ── Detect WebGL support once ── */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Error boundary for runtime Three.js errors ── */
class ThreeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

/* ── The actual GLB model ── */
function TractorModel() {
  const { scene } = useGLTF("/tractor-model.glb");
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.07;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1.0} position={[0, -0.5, 0]} />
    </group>
  );
}

/* ── Flat image fallback ── */
function FallbackImage({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.img
        src={tractor1}
        alt="AutoNxt X45H2"
        className="w-full max-w-md mx-auto drop-shadow-2xl"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Exported viewer — with WebGL pre-check ── */
export default function TractorViewer3D({ className = "" }: { className?: string }) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglOk(supportsWebGL());
  }, []);

  // Haven't checked yet — show fallback temporarily
  if (webglOk === null) {
    return <FallbackImage className={className} />;
  }

  // No WebGL support — show fallback permanently
  if (!webglOk) {
    return <FallbackImage className={className} />;
  }

  // WebGL available — render 3D canvas
  return (
    <ThreeErrorBoundary fallback={<FallbackImage className={className} />}>
      <div className={className} style={{ cursor: "grab" }}>
        <Canvas
          camera={{ position: [3, 1.5, 4], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
          <directionalLight position={[-4, 2, -4]} intensity={0.4} color="#3b82f6" />
          <pointLight position={[0, 4, 0]} intensity={0.5} color="hsl(0,72%,40%)" />

          <Suspense fallback={null}>
            <TractorModel />
            <ContactShadows
              position={[0, -1.0, 0]}
              opacity={0.3}
              scale={6}
              blur={2.5}
              far={3}
              color="#000000"
            />
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.9}
            autoRotate={false}
            dampingFactor={0.08}
            enableDamping
          />
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
}

useGLTF.preload("/tractor-model.glb");
