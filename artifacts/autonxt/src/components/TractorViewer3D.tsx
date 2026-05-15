import { Suspense, useRef, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds, useBounds } from "@react-three/drei";
import type { Group } from "three";
import defaultTractor from "@assets/1_1777731255751.png";
import { motion } from "framer-motion";

/* ── WebGL pre-check ── */
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

/* ── Trigger camera fit after model mounts ── */
function FitCamera() {
  const api = useBounds();
  useEffect(() => { api.refresh().fit(); }, [api]);
  return null;
}

/* ── Animated GLB model ── */
function TractorModel({ src, rotate }: { src: string; rotate: boolean }) {
  const { scene } = useGLTF(src);
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    if (rotate) ref.current.rotation.y = state.clock.elapsedTime * 0.28;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.06;
  });

  return (
    <Bounds fit clip observe margin={0.92}>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
      <FitCamera />
    </Bounds>
  );
}

/* ── Flat image fallback ── */
function FallbackImage({ src, className = "" }: { src?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.img
        src={src ?? defaultTractor}
        alt="AutoNxt Tractor"
        className="w-full h-full object-contain drop-shadow-2xl"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ── Exported component ── */
export default function TractorViewer3D({
  className = "",
  src = "/tractor-model.glb",
  rotate = true,
  showHint = false,
  fallbackSrc,
}: {
  className?: string;
  src?: string;
  rotate?: boolean;
  showHint?: boolean;
  fallbackSrc?: string;
}) {
  const [webglOk, setWebglOk] = useState<boolean | null>(null);
  useEffect(() => { setWebglOk(supportsWebGL()); }, []);

  if (webglOk === null || !webglOk) return <FallbackImage src={fallbackSrc} className={className} />;

  return (
    <ThreeErrorBoundary fallback={<FallbackImage src={fallbackSrc} className={className} />}>
      <div className={`relative ${className}`} style={{ cursor: "grab" }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 9, 6]}  intensity={2.4} castShadow color="#fff8f0" />
          <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#93c5fd" />
          <spotLight position={[0, 8, 3]} angle={0.4} penumbra={1} intensity={2.0} castShadow />
          <pointLight  position={[2, -1, 3]}        intensity={1.0} color="hsl(0,72%,40%)" />

          <Suspense fallback={null}>
            <TractorModel src={src} rotate={rotate} />
            <ContactShadows
              position={[0, -1.6, 0]}
              opacity={0.45}
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

        {showHint && (
          <motion.p
            className="absolute bottom-2 right-3 z-20 text-[10px] text-muted-foreground/50 font-medium select-none pointer-events-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          >
            ↺ drag to rotate
          </motion.p>
        )}
      </div>
    </ThreeErrorBoundary>
  );
}

/* Preload all models */
useGLTF.preload("/tractor-model.glb");
useGLTF.preload("/tractor-model-2.glb");
useGLTF.preload("/hitem3d-1.glb");
useGLTF.preload("/hitem3d-2.glb");
