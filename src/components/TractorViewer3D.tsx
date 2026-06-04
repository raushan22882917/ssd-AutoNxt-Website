import { Suspense, useRef, useState, useEffect, useCallback, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Bounds, useBounds } from "@react-three/drei";
import type { Group } from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

const defaultTractor = "/images/product-ev-platform.webp";

/* ── Wire Draco decoder into useGLTF's loader once at module level ── */
useGLTF.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

/* ── Static placeholder images per model path (first-ever load only) ── */
const MODEL_PLACEHOLDER: Record<string, string> = {
  "/3dmodel/hero.glb":    "/images/3dtractorplaceholder.webp",
  "/3dmodel/battery.glb": "/images/batteryimage.avif",
  "/3dmodel/motor.glb":   "/images/motorimage.avif",
  "/3dmodel/x45.glb":     "/images/products/x45h2.webp",
  "/3dmodel/bucket.glb":  "/images/implement/bucket-removebg-preview.webp",
};

/* ── sessionStorage key for a captured screenshot ── */
const screenshotKey = (src: string, fallback?: string) => `3d-screenshot:${src}:${fallback || ""}`;

/* ── Read a previously captured screenshot from sessionStorage ── */
function getCachedScreenshot(src: string, fallback?: string): string | null {
  try { return sessionStorage.getItem(screenshotKey(src, fallback)); }
  catch { return null; }
}

/* ── Save a screenshot to sessionStorage (fire-and-forget) ── */
function saveCachedScreenshot(src: string, fallback: string | undefined, dataUrl: string) {
  try { sessionStorage.setItem(screenshotKey(src, fallback), dataUrl); }
  catch { /* quota exceeded — silently skip */ }
}

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

/* ── Capture one frame from the WebGL canvas and cache it ── */
function ScreenshotCapture({ src, fallback, onCapture }: { src: string; fallback?: string; onCapture: (dataUrl: string) => void }) {
  const { gl } = useThree();
  const captured = useRef(false);

  useFrame(() => {
    // Fire once, two frames after mount so the model is fully rendered
    if (captured.current) return;
    captured.current = true;

    // Defer slightly to ensure the render pass has completed
    requestAnimationFrame(() => {
      try {
        const dataUrl = gl.domElement.toDataURL("image/png");
        saveCachedScreenshot(src, fallback, dataUrl);
        onCapture(dataUrl);
      } catch { /* cross-origin or security error — skip silently */ }
    });
  });

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

/* ── Flat image fallback (WebGL unavailable or error) ── */
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

/* ── Placeholder shown while the 3D model is loading ── */
function ModelPlaceholder({ src, className = "" }: { src?: string; className?: string }) {
  const { t } = useLang();
  const isCaptured = src?.startsWith("data:");   // cached screenshot → show crisp, no pulse

  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`}>
      {src ? (
        <motion.img
          src={src}
          alt={t.common.loadingModel}
          className="w-full h-full object-contain drop-shadow-xl"
          style={{ opacity: isCaptured ? 1 : undefined }}
          animate={isCaptured ? undefined : { opacity: [0.45, 0.75, 0.45] }}
          transition={isCaptured ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      )}
      {!isCaptured && (
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-muted-foreground/50 font-medium select-none">
          {t.common.loadingModel}
        </span>
      )}
    </div>
  );
}

/* ── Notifies parent that the Suspense boundary resolved ── */
function ModelReady({ onReady }: { onReady: () => void }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

/* ── Exported component ── */
export default function TractorViewer3D({
  className = "",
  src = "/3dmodel/hero.glb",
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
  const { t } = useLang();
  const [webglOk, setWebglOk]     = useState<boolean | null>(null);
  const [modelReady, setModelReady] = useState(false);

  // Start with a cached screenshot if one exists, else use the static image
  const [placeholderImg, setPlaceholderImg] = useState<string>(
    () => getCachedScreenshot(src, fallbackSrc) ?? fallbackSrc ?? MODEL_PLACEHOLDER[src] ?? defaultTractor
  );

  useEffect(() => { setWebglOk(supportsWebGL()); }, []);

  // When src changes (tab switch), reset state and reload from cache
  useEffect(() => {
    setModelReady(false);
    setPlaceholderImg(
      getCachedScreenshot(src, fallbackSrc) ?? fallbackSrc ?? MODEL_PLACEHOLDER[src] ?? defaultTractor
    );
  }, [src, fallbackSrc]);

  const handleCapture = useCallback((dataUrl: string) => {
    // Update placeholder with the live screenshot for future renders
    setPlaceholderImg(dataUrl);
  }, []);

  const staticFallback = fallbackSrc ?? MODEL_PLACEHOLDER[src] ?? defaultTractor;

  if (webglOk === null || !webglOk)
    return <FallbackImage src={staticFallback} className={className} />;

  return (
    <ThreeErrorBoundary fallback={<FallbackImage src={staticFallback} className={className} />}>
      <div className={`relative ${className}`} style={{ cursor: "grab" }}>

        {/* Placeholder — static image on first load, captured screenshot on subsequent loads */}
        <AnimatePresence>
          {!modelReady && (
            <motion.div
              key="placeholder"
              className="absolute inset-0 z-10 pointer-events-none"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <ModelPlaceholder src={placeholderImg} />
            </motion.div>
          )}
        </AnimatePresence>

        <Canvas
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,   // required to read canvas pixels for screenshot
          }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 9, 6]}  intensity={2.4} castShadow color="#fff8f0" />
          <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#93c5fd" />
          <spotLight        position={[0, 8, 3]}   angle={0.4} penumbra={1} intensity={2.0} castShadow />
          <pointLight       position={[2, -1, 3]}  intensity={1.0} color="hsl(0,72%,40%)" />

          <Suspense fallback={null}>
            <TractorModel src={src} rotate={rotate} />
            <ModelReady onReady={() => setModelReady(true)} />
            {/* Capture the canvas once after first render and cache in sessionStorage */}
            <ScreenshotCapture src={src} fallback={fallbackSrc} onCapture={handleCapture} />
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
            {t.common.dragToRotate}
          </motion.p>
        )}
      </div>
    </ThreeErrorBoundary>
  );
}

/* ── Preload only the hero model, after browser is idle ── */
/* Other models (battery, motor, x45, bucket) load on-demand when their section renders */
if (typeof window !== "undefined") {
  const preloadHero = () => useGLTF.preload("/3dmodel/hero.glb");
  if ("requestIdleCallback" in window) {
    requestIdleCallback(preloadHero, { timeout: 3000 });
  } else {
    setTimeout(preloadHero, 2000);
  }
}
