import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Images, PlayCircle, CalendarDays, ExternalLink } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import MediaLightbox, { MediaItem } from "@/components/MediaLightbox";
import { buildPhotoItems, buildEventItems } from "@/components/mediaHelpers";
import { OptimizedImg } from "@/components/ui/optimized-img";
import SEO from "@/components/SEO";

const tractor1 = "/images/products/x45h2.webp";
const event1   = "/images/events/event-1.webp";
const event3   = "/images/events/event-3.webp";
const event6   = "/images/events/event-6.webp";

const getLocalizedHeader = (lang: string, key: "images" | "videos") => {
  const dict: Record<string, { images: string; videos: string }> = {
    en: { images: "Images", videos: "Videos" },
    hi: { images: "तस्वीरें", videos: "वीडियो" },
    mr: { images: "छायाचित्रे", videos: "व्हिडिओ" },
    te: { images: "చిత్రాలు", videos: "వీడియోలు" },
  };
  return dict[lang]?.[key] || dict["en"][key];
};

const getLocalizedPlayLabel = (lang: string) => {
  const dict: Record<string, string> = {
    en: "Play Video",
    hi: "वीडियो चलाएं",
    mr: "व्हिडिओ प्ले करा",
    te: "వీడియో ప్లే చేయండి",
  };
  return dict[lang] || dict["en"];
};

const getLocalizedCategoryName = (lang: string, category: string) => {
  const dict: Record<string, Record<string, string>> = {
    en: {
      "Agriculture & Farming": "Agriculture & Farming",
      "Waste Management & Recycling": "Waste Management & Recycling",
      "Industrial Automation, Logistics & Heavy Machinery": "Industrial Automation, Logistics & Heavy Machinery"
    },
    hi: {
      "Agriculture & Farming": "कृषि और खेती",
      "Waste Management & Recycling": "अपशिष्ट प्रबंधन और पुनर्चक्रण",
      "Industrial Automation, Logistics & Heavy Machinery": "औद्योगिक स्वचालन, रसद और भारी मशीनरी"
    },
    mr: {
      "Agriculture & Farming": "कृषि आणि शेती",
      "Waste Management & Recycling": "कचरा व्यवस्थापन आणि पुनर्वापर",
      "Industrial Automation, Logistics & Heavy Machinery": "औद्योगिक ऑटोमेशन, लॉजिस्टिक्स आणि अवजड यंत्रसामग्री"
    },
    te: {
      "Agriculture & Farming": "వ్యవసాయం & వ్యవసాయం",
      "Waste Management & Recycling": "వ్యర్థాల నిర్వహण & రీసైక్లింగ్",
      "Industrial Automation, Logistics & Heavy Machinery": "పారిశ్రామిక ఆటోమేషన్, లాజిస్టిక్స్ & భారీ యంత్రాలు"
    }
  };
  return dict[lang]?.[category] || dict["en"][category];
};

const getLocalizedViewMoreVideosLabel = (lang: string) => {
  const dict: Record<string, string> = {
    en: "View More Videos on YouTube",
    hi: "यूट्यूब पर और वीडियो देखें",
    mr: "YouTube वर अधिक व्हिडिओ पहा",
    te: "యూట్యూబ్‌లో మరిన్ని వీడియోలను చూడండి",
  };
  return dict[lang] || dict["en"];
};

const VIDEOS_DATA = [
  // Agriculture & Farming
  {
    title: "241112 AutoNXT Electric Tractor",
    category: "Agriculture & Farming",
    driveFileId: "1mZAg7D6edsFJYXNP3SOlG4cwUW_W1aUA",
    description: "Discover the AutoNXT Electric Tractor in action, showcasing its design, capabilities, and how it supports modern farming operations."
  },
  {
    title: "241113 Reversible Ploughing",
    category: "Agriculture & Farming",
    driveFileId: "1lLsYTWmA5SsXHZYltLfAR0vnl5M4gdpI",
    description: "See the AutoNXT tractor perform reversible ploughing, demonstrating efficient soil preparation for the next cultivation cycle."
  },
  {
    title: "241113 Reversible Ploughing Horizontal",
    category: "Agriculture & Farming",
    driveFileId: "1CkEsjljCZqG-fzbWHwCHFUoBZQy8R-SZ",
    description: "Watch the horizontal-format demonstration of reversible ploughing, highlighting smooth and effective field preparation."
  },
  {
    title: "241210 Sugar Cane Haulage",
    category: "Agriculture & Farming",
    driveFileId: "1nH1ByfiDkhX2zdHQH1-RsRhJhffmpHv3",
    description: "Explore how the AutoNXT tractor handles sugar cane haulage, supporting efficient transportation during harvesting operations."
  },
  {
    title: "250409 X45H2 Electric Tractor Operating a Square Baler",
    category: "Agriculture & Farming",
    driveFileId: "1hMm1AWh5ZlZU4KrwOlGjQU_FUrqYH50r",
    description: "Experience the X45H2 Electric Tractor operating a square baler, showcasing its application in baling and forage management."
  },
  {
    title: "250507 Silage Baler",
    category: "Agriculture & Farming",
    driveFileId: "1lnV_4ak7SZ5lspGYiS1XsMhEHugV-ixg",
    description: "Watch the AutoNXT tractor perform silage baling, demonstrating its role in efficient forage harvesting operations."
  },
  {
    title: "250603 Spraying for Vineyards and Plantations (16:9)",
    category: "Agriculture & Farming",
    driveFileId: "1kZcl2PuWE8hWT5udTjOuymeSkXZuzj_S",
    description: "See precision spraying operations designed for vineyards and plantations, helping support effective crop care and field management."
  },
  {
    title: "250603 Spraying for Vineyards and Plantations (9:16)",
    category: "Agriculture & Farming",
    driveFileId: "1V9ZD_3MvrIrC9rNDGrgIzRWYm3lYG0D7",
    description: "A vertical-format showcase of precision spraying for vineyards and plantations, demonstrating targeted agricultural applications."
  },
  {
    title: "250622 X45H2 Ploughing",
    category: "Agriculture & Farming",
    driveFileId: "1jRv86UMXzmEC3DUOge8-RNMit_pXWUIz",
    description: "Watch the X45H2 Electric Tractor perform ploughing operations, highlighting its field preparation capabilities."
  },
  {
    title: "250622 X45H2 Ploughing (16:9)",
    category: "Agriculture & Farming",
    driveFileId: "1an1w-hYSLyNUc67wAbqxgGrSuCF3JhRG",
    description: "A widescreen demonstration of the X45H2 carrying out ploughing operations in real farming conditions."
  },

  // Waste Management & Recycling
  {
    title: "250518 Waste Management (9:16)",
    category: "Waste Management & Recycling",
    driveFileId: "1c4w8OA-f9BAbHdFZeaOHUnUSBwuhb8Pa",
    description: "A vertical-format demonstration of waste management and recycling operations using the AutoNXT tractor."
  },
  {
    title: "250518 Waste Management (16:9)",
    category: "Waste Management & Recycling",
    driveFileId: "1uqQZaxdVrwdd9too3DmOK3csLcEVzrFN",
    description: "See the AutoNXT tractor supporting waste management operations through material handling and recycling applications."
  },

  // Industrial Automation, Logistics & Heavy Machinery
  {
    title: "241111 AutoNXT Breathe Event New Delhi",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1Dzb_F1EVGKpud98QYfPs-nXuKneyb3nx",
    description: "Highlights from the AutoNXT showcase at the Breathe Event in New Delhi, featuring the company's technology and innovations."
  },
  {
    title: "241114 Autonxt Product Description",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1AH1djNhoCz0EJFkKK47Sbxw2ZBRR3Df9",
    description: "Get an overview of the AutoNXT product, including its features, applications, and technology."
  },
  {
    title: "241114 Autonxt Product Description with Voice Over English",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1kZGp9W0zhUmvDC7BHiuyIOFcEeX7vW-M",
    description: "Explore the AutoNXT product through a detailed English voice-over explaining its key features and applications."
  },
  {
    title: "241114 Autonxt Product Description with Voice Over Hindi",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1ge5CJYWD77tNuVScQgibsq7JIUr_RTUq",
    description: "A Hindi voice-over presentation introducing the AutoNXT product, its capabilities, and practical applications."
  },
  {
    title: "241114 Autonxt Product Description with Voice Over Marathi",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1j-6RLwnwPJ6ExP8dH8lpkRiMX9ys8Bug",
    description: "Learn about the AutoNXT product through a Marathi voice-over highlighting its features and use cases."
  },
  {
    title: "241121 Driverless Tractor",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "16UMSNJYGyqk2Wf0xsnudUP3qviCMMp0q",
    description: "Watch the AutoNXT Driverless Tractor demonstrate autonomous movement and navigation capabilities."
  },
  {
    title: "241121 Driverless Tractor Final",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1hRkVRJ9hE8TijabwJyv4j1YOI6MAaL1X",
    description: "The final demonstration showcasing the autonomous operation of the AutoNXT Driverless Tractor."
  },
  {
    title: "241123 Loaders and Grabbers",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1YHX1ceFbJihyYAACplhSM5GdoDom6XWA",
    description: "See loader and grabber attachments in action, demonstrating material handling and operational versatility."
  },
  {
    title: "241129 Nashik Exhibition Reel",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "18O4IDvdeC9t-1A7GpCsmoxg3T91DomjT",
    description: "Experience key moments from the AutoNXT exhibition held in Nashik, featuring product showcases and demonstrations."
  },
  {
    title: "241130 Nagpur Exhibition Reel",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "12u8mcIM9qNiE6WyBm0tV0-Z2RfFH7sGZ",
    description: "Highlights from the AutoNXT exhibition in Nagpur, showcasing innovation and customer engagement."
  },
  {
    title: "241230 Haulage",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1neiQF98U8WOolbzLil_VlY_pOm5iD-cI",
    description: "Watch the AutoNXT tractor perform haulage operations, demonstrating its capability in transporting heavy loads."
  },
  {
    title: "250104 Association NFCSF New Delhi",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1St52AnKsDdEZ9a_xycRU8jzdIqKHEiT6",
    description: "Highlights from AutoNXT's participation at the NFCSF event in New Delhi."
  },
  {
    title: "250710 AutoNXT Automation 10th July X45H2",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "19lzBNyMhfeb8jWoLd_-wv5RDVe24_Y2w",
    description: "Discover the X45H2 showcasing AutoNXT's automation technology through a live operational demonstration."
  },
  {
    title: "250904 20 Feet Grabber Attachment",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1HUEISp01YCdTlIJsVkVa--fQ9XtRktFE",
    description: "Watch the 20-foot grabber attachment perform material handling tasks with precision and control."
  },
  {
    title: "250904 20 Feet Grabber Attachment (Horizontal)",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "13KvUqON6JbiZyTC7mNEL5Zbb7XmKd8Yx",
    description: "A horizontal-format demonstration of the 20-foot grabber attachment in operation."
  },
  {
    title: "260330 AutoNXT Automation Intro Video",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1JlkAzXMqwEZEa5gGldEQOFxEBp6eTp_k",
    description: "An introduction to AutoNXT, presenting the company's automation technologies and product vision."
  },
  {
    title: "260330 AutoNXT Automation Intro Video Updated",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "19hpw5mTjFCv05FUy9g5CsaG5jKh1ndUn",
    description: "An updated introduction showcasing AutoNXT's automation solutions and technological advancements."
  },
  {
    title: "AutoNXT Showcase AV for Exhibition",
    category: "Industrial Automation, Logistics & Heavy Machinery",
    driveFileId: "1jIvrGstyHt07ZRvz58XtVFOl0nYFUsSK",
    description: "A showcase presentation created for exhibitions, highlighting AutoNXT's products, innovations, and technology."
  }
].map(video => ({
  ...video,
  embedUrl: `https://drive.google.com/file/d/${video.driveFileId}/preview`
}));

const VIDEO_CATEGORIES = [
  "Agriculture & Farming",
  "Waste Management & Recycling",
  "Industrial Automation, Logistics & Heavy Machinery"
];

export default function Gallery() {
  const { t, lang } = useLang();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<MediaItem[]>([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const [activeImageTab, setActiveImageTab] = useState<"photos" | "events">("photos");
  const [activeVideoTab, setActiveVideoTab] = useState<string>("Agriculture & Farming");

  const handleOpenImage = (index: number, section: "photos" | "events") => {
    const items = section === "photos" ? buildPhotoItems(t) : buildEventItems(t);
    setLightboxItems(items);
    setInitialIndex(index);
    setLightboxOpen(true);
  };

  const handleOpenVideo = (index: number, categoryVideos: typeof VIDEOS_DATA) => {
    const items = categoryVideos.map(video => ({
      type: "video" as const,
      src: video.embedUrl,
      alt: video.description,
      label: video.title,
    }));
    setLightboxItems(items);
    setInitialIndex(index);
    setLightboxOpen(true);
  };


  return (
    <div className="w-full min-h-screen bg-background">
      <SEO title={t.nav.gallery} description="Browse images and videos of AutoNxt electric tractors at work in agriculture, fields, and industrial operations." />

      {/* ── HERO ── */}
      <section className="bg-background relative overflow-hidden pt-24 pb-0 lg:h-[93.75vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,hsl(0,72%,40%,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,hsl(214,65%,32%,0.09),transparent_50%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(hsl(0,0%,0%) 1px,transparent 1px),linear-gradient(90deg,hsl(0,0%,0%) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch h-full">
            <div className="h-full flex flex-col justify-between pb-12 lg:pb-0">
              <div>
                <motion.div
                  className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-4 py-1.5 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    {t.gallery.galleryBadge || "AutoNxt Gallery"}
                  </span>
                </motion.div>
                <motion.h1
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.06]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                >
                  {t.gallery.title}{" "}
                  <span className="text-primary">{t.gallery.titleHighlight}</span>
                </motion.h1>
                <motion.p
                  className="text-muted-foreground text-lg max-w-lg leading-relaxed mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.18 }}
                >
                  {t.gallery.desc}
                </motion.p>
              </div>
              <motion.div
                className="flex flex-wrap gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
              >
                {[
                  { icon: Images, label: t.galleryPage.galleryPhotos, value: "40+" },
                  { icon: PlayCircle, label: t.galleryPage.galleryVideos, value: "30" },
                  { icon: CalendarDays, label: t.galleryPage.galleryEvents, value: "5+" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                      <f.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-widest font-medium">{f.label}</p>
                      <p className="text-foreground font-bold text-sm">{f.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="relative pb-0 hidden lg:block h-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="grid grid-cols-3 grid-rows-2 gap-2 h-full min-h-[420px]">
                <div className="col-span-2 row-span-2 rounded-tl-2xl overflow-hidden border border-border">
                  <OptimizedImg src={event6} alt="AutoNxt launch event" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-tr-2xl overflow-hidden border border-border">
                  <OptimizedImg src={event1} alt="AutoNxt field" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="overflow-hidden border border-border">
                  <OptimizedImg src={event3} alt="AutoNxt ceremony" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALLERY CONTENT ── */}
      <section className="py-16 md:py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">

          {/* ── IMAGES SECTION ── */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              className="flex items-center justify-center gap-3 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-10 bg-primary rounded-full" />
              <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.gallery.galleryBadge}</p>
              <div className="h-px w-10 bg-primary rounded-full" />
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {getLocalizedHeader(lang, "images")}
            </motion.h2>
            <p className="text-muted-foreground text-sm md:text-base">{t.gallery.desc}</p>
          </div>

          {/* Segmented Controls for Active Tab */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-muted rounded-2xl border border-border">
              <button
                onClick={() => setActiveImageTab("photos")}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeImageTab === "photos"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.gallery.photos}
              </button>
              <button
                onClick={() => setActiveImageTab("events")}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  activeImageTab === "events"
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.gallery.events}
              </button>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
            {(activeImageTab === "photos" ? buildPhotoItems(t) : buildEventItems(t)).map((item, idx) => (
              <motion.div
                key={idx}
                onClick={() => handleOpenImage(idx, activeImageTab)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-border bg-card shadow-sm hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <OptimizedImg
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-left z-10">
                  <span className="text-white font-display font-bold text-sm tracking-wide line-clamp-1">
                    {item.label}
                  </span>
                  <span className="text-white/80 text-xs mt-0.5 block line-clamp-1">
                    {item.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── VIDEOS SECTION ── */}
          <div className="border-t border-border pt-16 mt-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.div
                className="flex items-center justify-center gap-3 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="h-px w-10 bg-primary rounded-full" />
                <p className="text-primary font-bold text-sm uppercase tracking-widest">{t.gallery.galleryBadge}</p>
                <div className="h-px w-10 bg-primary rounded-full" />
              </motion.div>
              <motion.h2
                className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {getLocalizedHeader(lang, "videos")}
              </motion.h2>
              <p className="text-muted-foreground text-sm md:text-base">
                {lang === "hi"
                  ? "विभिन्न अनुप्रयोगों में काम करते हुए ऑटोनेक्स्ट इलेक्ट्रिक ट्रैक्टर और ऑटोमेशन सिस्टम के वीडियो देखें।"
                  : lang === "mr"
                  ? "विविध अनुप्रयोगांमध्ये कार्यरत ऑटोनेक्स्ट इलेक्ट्रिक ट्रॅक्टर आणि ऑटोमेशन सिस्टीमचे व्हिडिओ पहा."
                  : lang === "te"
                  ? "వివిధ అప్లికేషన్లలో ఆటోనెక్స్ట్ ఎలక్ట్రిక్ ట్రాక్టర్లు మరియు ఆటోమేషన్ సిస్టమ్స్ యొక్క వీడియోలను చూడండి."
                  : "Watch AutoNXT electric tractors and automation systems in action across various applications."}
              </p>
            </div>

            {/* Segmented Controls for Active Video Tab */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 bg-muted rounded-2xl border border-border flex-wrap justify-center gap-1">
                {VIDEO_CATEGORIES.map((categoryName) => (
                  <button
                    key={categoryName}
                    onClick={() => setActiveVideoTab(categoryName)}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      activeVideoTab === categoryName
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {getLocalizedCategoryName(lang, categoryName)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {VIDEO_CATEGORIES.map((categoryName) => {
                if (categoryName !== activeVideoTab) return null;
                const categoryVideos = VIDEOS_DATA.filter(v => v.category === categoryName);
                
                return (
                  <div key={categoryName} className="text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {categoryVideos.map((video, videoIdx) => {
                        const thumbnailSrc = `/images/gallery-videos.webp`;

                        return (
                          <motion.div
                            key={videoIdx}
                            onClick={() => handleOpenVideo(videoIdx, categoryVideos)}
                            className="group flex flex-col bg-card rounded-3xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative aspect-video overflow-hidden bg-black">
                              <OptimizedImg
                                src={thumbnailSrc}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                  <PlayCircle className="w-6 h-6 text-white fill-white/10" />
                                </div>
                              </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between text-left">
                              <div>
                                <h3 className="font-display font-bold text-lg text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
                                  {video.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mt-3 line-clamp-3 leading-relaxed">
                                  {video.description}
                                </p>
                              </div>
                              
                              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
                                {getLocalizedPlayLabel(lang)} &rarr;
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* YouTube channel link */}
          <motion.div
            className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-10 text-center relative overflow-hidden border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,hsl(0,72%,45%,0.08),transparent_55%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_20px_rgba(255,0,0,0.25)]">
                <PlayCircle className="w-7 h-7 text-white fill-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t.gallery.moreOnYouTube}</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                {t.gallery.youtubeDesc}
              </p>
              <a
                href="https://www.youtube.com/@autonxtautomation8368"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8" size="lg">
                  {getLocalizedViewMoreVideosLabel(lang)} <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-3">{t.gallery.seeInPerson}</h3>
            <p className="text-muted-foreground mb-6">{t.gallery.seeInPersonDesc}</p>
            <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90 font-semibold">
              <Link href="/book" data-testid="btn-schedule-viewing">
                {t.gallery.scheduleDemo}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {lightboxOpen && (
        <MediaLightbox
          items={lightboxItems}
          initialIndex={initialIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
