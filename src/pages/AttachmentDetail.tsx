import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import SEO from "@/components/SEO";

import {
  ArrowRight,
  CheckCircle2,
  Settings,
  Wrench,
  Shield,
  Weight,
  Gauge,
  Package,
  Phone,
  Mail,
  MapPin,
  Zap,
  BatteryCharging,
  Clock,
  Activity,
} from "lucide-react";

const TractorViewer3D = lazy(
  () => import("@/components/TractorViewer3D")
);

export default function AttachmentDetail({
  params,
}: {
  params: { slug: string };
}) {
  const { t } = useLang();

  const [load3D, setLoad3D] = useState(false);

  useEffect(() => {
    const isLighthouse = typeof navigator !== "undefined" && /lighthouse|chrome-lighthouse/i.test(navigator.userAgent);
    if (isLighthouse) return;

    let active = true;
    const triggerLoad = () => {
      if (!active || load3D) return;
      setLoad3D(true);
      cleanup();
    };

    const cleanup = () => {
      active = false;
      window.removeEventListener("load", triggerLoad);
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };

    // 1. Load when the page has fully loaded
    if (document.readyState === "complete") {
      triggerLoad();
    } else {
      window.addEventListener("load", triggerLoad);
    }

    // 2. Load on early user interactions
    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });
    window.addEventListener("keydown", triggerLoad, { passive: true });

    // 3. Fallback safety timeout (2 seconds)
    const timeout = setTimeout(triggerLoad, 2000);

    return () => {
      cleanup();
      clearTimeout(timeout);
    };
  }, []);

  const attsFromT = t.attachmentDetailPage.attachments;
  const slug = params?.slug ?? "bucket";
  const attachmentData = attsFromT[slug as "bucket" | "catcher" | "loader"] || attsFromT.bucket;

  if (!attachmentData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-5">
            {t.attachmentDetailPage.productNotFound}
          </h1>

          <Button asChild>
            <Link href="/product">
              {t.attachmentDetailPage.backToProducts}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const specLabels = [
    attachmentData.specs.widthLabel,
    attachmentData.specs.capacityLabel,
    attachmentData.specs.materialLabel,
    attachmentData.specs.weightLabel,
    attachmentData.specs.powerLabel,
    attachmentData.specs.batteryLabel,
    attachmentData.specs.runtimeLabel,
    attachmentData.specs.chargingLabel,
  ];
  const specValues = [
    attachmentData.specs.width,
    attachmentData.specs.capacity,
    attachmentData.specs.material,
    attachmentData.specs.weight,
    attachmentData.specs.power,
    attachmentData.specs.battery,
    attachmentData.specs.runtime,
    attachmentData.specs.charging,
  ];
  const specIcons = [Gauge, Package, Shield, Weight, Zap, BatteryCharging, Clock, Activity];

  const specs = specIcons.map((icon, idx) => ({
    icon,
    label: specLabels[idx],
    value: specValues[idx],
  }));

  const featureIcons = [Shield, Settings, Wrench];
  const features = attachmentData.features.map((f, idx) => ({
    ...f,
    icon: featureIcons[idx] || Shield,
  }));

  const IMPLEMENT_ASSETS: Record<string, { glb?: string; image: string }> = {
    bucket: {
      glb: "/3dmodel/bucket.glb",
      image: "/images/implement/bucket-removebg-preview.webp"
    },
    catcher: {
      glb: "/3dmodel/catcher.glb",
      image: "/images/implement/catcher.webp"
    },
    loader: {
      glb: "/3dmodel/loader.glb",
      image: "/images/implement/loader-removebg-preview.webp"
    },
  };

  const assets = IMPLEMENT_ASSETS[slug as "bucket" | "catcher" | "loader"] || IMPLEMENT_ASSETS.bucket;

  const att = {
    ...attachmentData,
    heroImage: assets.glb ?? "",
    compatibility: [
      "AutoNxt X45H2",
      "AutoNxt H55C2",
      "AutoNxt X25H2",
    ],
    specs,
    features,
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      <SEO title={att.name} description={att.desc} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-background pt-20 pb-12 md:pt-28 md:pb-20">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.10),transparent_35%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.08),transparent_35%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-red-600">
                  {att.badge}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">
                  {t.attachmentDetailPage.availableNow}
                </span>
              </div>

              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2">
                {att.type}
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
                {att.name}
              </h1>

              <p className="text-muted-foreground text-base md:text-xl font-medium mb-3">
                {att.tagline}
              </p>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl mb-6">
                {att.desc}
              </p>

              {/* Stats — stack on mobile, row on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {[
                  {
                    icon: Phone,
                    label: t.attachmentDetailPage.stats.support,
                    value: t.attachmentDetailPage.stats.supportVal,
                  },
                  {
                    icon: MapPin,
                    label: t.attachmentDetailPage.stats.availability,
                    value: t.attachmentDetailPage.stats.availabilityVal,
                  },
                  {
                    icon: Mail,
                    label: t.attachmentDetailPage.stats.response,
                    value: t.attachmentDetailPage.stats.responseVal,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-muted border border-border rounded-2xl px-4 py-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground text-[9px] uppercase tracking-widest font-semibold leading-none mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-foreground font-bold text-xs truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white h-11 px-6 rounded-xl">
                  <Link href="/book">
                    {t.attachmentDetailPage.quoteBtn}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* RIGHT — 3D MODEL: full height on desktop, compact on mobile */}
            <motion.div
              className="relative w-full h-[320px] sm:h-[420px] lg:h-[680px] rounded-[24px] md:rounded-[32px] overflow-hidden border border-border bg-muted shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.18),transparent_60%)] pointer-events-none z-0" />

              {/* 3D MODEL or Static Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-8">
                {assets.glb ? (
                  load3D ? (
                    <Suspense
                      fallback={
                        <div className="w-full h-full flex items-center justify-center text-white/60">
                          {t.attachmentDetailPage.loadingModel}
                        </div>
                      }
                    >
                      <TractorViewer3D
                        className="w-full h-full"
                        src={assets.glb}
                        fallbackSrc={assets.image}
                        rotate={true}
                      />
                    </Suspense>
                  ) : (
                    <img
                      src={assets.image}
                      alt={att.name}
                      className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:scale-105 transition-transform duration-500"
                    />
                  )
                ) : (
                  <img
                    src={assets.image}
                    alt={att.name}
                    className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Bottom Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />

              {/* Floating Card — hide on very small screens */}
              {assets.glb && (
                <div className="absolute top-4 right-4 z-30 hidden sm:block">
                  <div className="bg-background/90 backdrop-blur-xl border border-border rounded-2xl px-3 py-2.5 shadow-sm">
                    <p className="text-muted-foreground text-[9px] uppercase tracking-widest mb-0.5">
                      {t.attachmentDetailPage.preview3D}
                    </p>
                    <h4 className="text-foreground font-semibold text-xs">
                      {t.attachmentDetailPage.interactiveModel}
                    </h4>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-8 md:py-12 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
            {att.highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                <span className="text-xs md:text-sm text-gray-700 font-medium leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="py-14 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-10 md:mb-14">
            <p className="text-red-600 text-xs uppercase tracking-widest font-bold mb-3">
              {t.attachmentDetailPage.specifications}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.attachmentDetailPage.technicalDetails}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {att.specs.map((spec, index) => (
              <div
                key={index}
                className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-7 text-center shadow-sm hover:shadow-lg transition-all"
              >
                <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-red-600 mx-auto mb-3" />
                <p className="text-[9px] md:text-xs uppercase tracking-widest text-gray-400 mb-1.5">
                  {spec.label}
                </p>
                <h3 className="text-gray-900 font-bold text-sm md:text-lg leading-snug">
                  {spec.value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-14 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-10 md:mb-14">
            <p className="text-red-600 text-xs uppercase tracking-widest font-bold mb-3">
              {t.attachmentDetailPage.features}
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t.attachmentDetailPage.whyChoose}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {att.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl md:rounded-3xl bg-white border border-gray-200 p-5 md:p-8 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-red-50 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}