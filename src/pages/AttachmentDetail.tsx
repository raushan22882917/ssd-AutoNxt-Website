import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import {
  ArrowRight,
  ArrowLeft,
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
} from "lucide-react";

const TractorViewer3D = lazy(
  () => import("@/components/TractorViewer3D")
);

const ATTACHMENTS: Record<
  string,
  {
    name: string;
    type: string;
    badge: string;
    tagline: string;
    desc: string;
    heroImage: string;
    specs: {
      label: string;
      value: string;
      icon: React.ElementType;
    }[];
    features: {
      icon: React.ElementType;
      title: string;
      desc: string;
    }[];
    compatibility: string[];
    highlights: string[];
  }
> = {
  "bucket": {
    name: "18 Ft s Bucket",
    type: "Heavy Duty Implement",
    badge: "Heavy Duty",
    tagline: "Maximum Digging Power for Any Terrain",
    desc:
      "The AutoNxt 18 Ft Graber Bucket is engineered for heavy-duty excavation and material handling with seamless AutoNxt integration.",

    heroImage: "/3dmodel/bucket.glb",

    specs: [
      {
        label: "Width",
        value: "18 Feet",
        icon: Gauge,
      },
      {
        label: "Capacity",
        value: "0.8m³",
        icon: Package,
      },
      {
        label: "Material",
        value: "Hardox 450",
        icon: Shield,
      },
      {
        label: "Weight",
        value: "480kg",
        icon: Weight,
      },
    ],

    features: [
      {
        icon: Shield,
        title: "Hardox Steel",
        desc:
          "Extreme wear resistance for long-term durability in rugged environments.",
      },

      {
        icon: Settings,
        title: "Universal Hitch",
        desc:
          "Compatible with all AutoNxt tractor platforms.",
      },

      {
        icon: Wrench,
        title: "Quick Release Teeth",
        desc:
          "Replaceable teeth system for easy maintenance.",
      },
    ],

    compatibility: [
      "AutoNxt X45H2",
      "AutoNxt H55C2",
      "AutoNxt X25H2",
    ],

    highlights: [
      "Heavy Duty Design",
      "Zero Emission Compatible",
      "3 Point Hitch",
      "Industrial Grade Steel",
      "Fast Maintenance",
      "Made For Bharat",
    ],
  },
  "catcher": {
    name: "18 Ft Catcher",
    type: "Precision Implement",
    badge: "Precision",
    tagline: "Efficient Material Collection and Harvesting",
    desc:
      "The AutoNxt 18 Ft Catcher is precision-engineered for efficient material collection and harvesting with seamless AutoNxt integration.",

    heroImage: "/3dmodel/bucket.glb",

    specs: [
      {
        label: "Width",
        value: "18 Feet",
        icon: Gauge,
      },
      {
        label: "Capacity",
        value: "0.75m³",
        icon: Package,
      },
      {
        label: "Material",
        value: "Hardox 400",
        icon: Shield,
      },
      {
        label: "Weight",
        value: "450kg",
        icon: Weight,
      },
    ],

    features: [
      {
        icon: Shield,
        title: "Precision Engineering",
        desc:
          "Optimized design for accurate material collection and minimal spillage.",
      },

      {
        icon: Settings,
        title: "Universal Hitch",
        desc:
          "Compatible with all AutoNxt tractor platforms.",
      },

      {
        icon: Wrench,
        title: "Easy Maintenance",
        desc:
          "Simplified maintenance design for quick servicing.",
      },
    ],

    compatibility: [
      "AutoNxt X45H2",
      "AutoNxt H55C2",
      "AutoNxt X25H2",
    ],

    highlights: [
      "Precision Design",
      "Zero Emission Compatible",
      "3 Point Hitch",
      "Optimized Capacity",
      "Easy Maintenance",
      "Made For Bharat",
    ],
  },
  "loader": {
    name: "18 Ft Loader Bucket",
    type: "Max Load Implement",
    badge: "Max Load",
    tagline: "Maximum Efficiency in Loading and Material Transport",
    desc:
      "The AutoNxt 18 Ft Loader Bucket is engineered for maximum efficiency in loading and material transport with seamless AutoNxt integration.",

    heroImage: "/3dmodel/bucket.glb",

    specs: [
      {
        label: "Width",
        value: "18 Feet",
        icon: Gauge,
      },
      {
        label: "Capacity",
        value: "0.9m³",
        icon: Package,
      },
      {
        label: "Material",
        value: "Hardox 500",
        icon: Shield,
      },
      {
        label: "Weight",
        value: "520kg",
        icon: Weight,
      },
    ],

    features: [
      {
        icon: Shield,
        title: "Maximum Capacity",
        desc:
          "Engineered for maximum load capacity and durability in heavy operations.",
      },

      {
        icon: Settings,
        title: "Universal Hitch",
        desc:
          "Compatible with all AutoNxt tractor platforms.",
      },

      {
        icon: Wrench,
        title: "Reinforced Structure",
        desc:
          "Extra reinforcement for handling maximum loads safely.",
      },
    ],

    compatibility: [
      "AutoNxt X45H2",
      "AutoNxt H55C2",
      "AutoNxt X25H2",
    ],

    highlights: [
      "Maximum Capacity",
      "Zero Emission Compatible",
      "3 Point Hitch",
      "Reinforced Steel",
      "Heavy Duty Design",
      "Made For Bharat",
    ],
  },
};

export default function AttachmentDetail({
  params,
}: {
  params: { slug: string };
}) {
  const att = ATTACHMENTS[params?.slug ?? ""];

  if (!att) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-5">
            Product Not Found
          </h1>

          <Link href="/product">
            <Button>Back To Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-black pt-28 pb-20">

        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,68,68,0.18),transparent_35%)] pointer-events-none" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.12),transparent_35%)] pointer-events-none" />

        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">

          {/* Back */}
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-white px-3 py-1.5 rounded-full bg-red-600">
                  {att.badge}
                </span>

                <span className="text-xs font-bold text-emerald-400 bg-emerald-400/15 border border-emerald-400/30 px-3 py-1.5 rounded-full">
                  Available Now
                </span>
              </div>

              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
                {att.type}
              </p>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                {att.name}
              </h1>

              <p className="text-white/70 text-xl font-medium mb-5">
                {att.tagline}
              </p>

              <p className="text-white/50 text-base leading-relaxed max-w-xl mb-8">
                {att.desc}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  {
                    icon: Phone,
                    label: "Support",
                    value: "24/7",
                  },

                  {
                    icon: MapPin,
                    label: "Availability",
                    value: "Pan India",
                  },

                  {
                    icon: Mail,
                    label: "Response",
                    value: "< 24H",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>

                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                        {item.label}
                      </p>

                      <p className="text-white font-bold text-sm">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link href="/book">
                  <Button className="bg-red-600 hover:bg-red-700 text-white h-12 px-7 rounded-xl">
                    Request Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>

                <Link href="/book">
                  <Button
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 h-12 px-7 rounded-xl"
                  >
                    Book Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT 3D MODEL */}
            <motion.div
              className="relative w-full h-[680px] rounded-[32px] overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.18),transparent_60%)] pointer-events-none z-0" />

              {/* 3D MODEL */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center text-white/60">
                      Loading 3D Model...
                    </div>
                  }
                >
                  <TractorViewer3D
                    className="w-full h-full"
                    src={att.heroImage}
                    rotate={true}
                  />
                </Suspense>
              </div>

              {/* Bottom Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />

              {/* Floating Card */}
              <div className="absolute top-5 right-5 z-30">
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">
                    3D Preview
                  </p>

                  <h4 className="text-white font-semibold text-sm">
                    Interactive Model
                  </h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-12 bg-red-50 border-y border-red-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {att.highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />

                <span className="text-sm text-gray-700 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-14">
            <p className="text-red-600 text-sm uppercase tracking-widest font-bold mb-3">
              Specifications
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Technical Details
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {att.specs.map((spec, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-white p-7 text-center shadow-sm hover:shadow-lg transition-all"
              >
                <spec.icon className="w-6 h-6 text-red-600 mx-auto mb-4" />

                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
                  {spec.label}
                </p>

                <h3 className="text-gray-900 font-bold text-lg">
                  {spec.value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">

          <div className="text-center mb-14">
            <p className="text-red-600 text-sm uppercase tracking-widest font-bold mb-3">
              Features
            </p>

            <h2 className="text-4xl font-bold text-gray-900">
              Why Choose This Product
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {att.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
                  <feature.icon className="w-6 h-6 text-red-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
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