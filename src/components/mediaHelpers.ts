import { MediaItem } from "./MediaLightbox";

// Organized public image paths matching the current Gallery page
const tractor1   = "/images/products/x45h2.webp";
const tractor2   = "/images/products/x27h2.webp";
const trailerImg = "/images/facility/left-wall.webp";
const fieldImg   = "/images/facility/right-wall.webp";
const batteryImg = "/images/products/battery.webp";
const motorImg   = "/images/products/motor.webp";
const logoImg    = "/images/products/logo.webp";

const event1 = "/images/events/event-1.webp";
const event2 = "/images/events/event-2.webp";
const event3 = "/images/events/event-3.webp";
const event4 = "/images/events/event-4.webp";
const event5 = "/images/events/event-5.webp";
const event6 = "/images/events/event-6.webp";
const event7 = "/images/events/event-7.webp";


export const photoAssets = [
  fieldImg,
  tractor1,
  tractor2,
  trailerImg,
  batteryImg,
  motorImg,
  logoImg,
];

export const eventAssets = [
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  event7,
];

export const buildPhotoItems = (t: any): MediaItem[] =>
  photoAssets.map((src, i) => ({
    type: "image" as const,
    src,
    alt: t.galleryPage.photos[i]?.alt || "",
    label: t.galleryPage.photos[i]?.label || "",
  }));

export const buildVideoItems = (t: any): MediaItem[] => {
  const videoIds = ["3PVEHTybb_o", "9Px1KnfeBdY", "kia8cxkaUJc", "u2a1EoXayrk", "UHtiUSmO27I", "Z6107d2ygF0"];
  return videoIds.map((id, idx) => ({
    type: "video" as const,
    src: `https://www.youtube.com/watch?v=${id}`,
    alt: t.galleryPage.videos[idx]?.title || "",
    label: t.galleryPage.videos[idx]?.title || "",
  }));
};

export const buildEventItems = (t: any): MediaItem[] =>
  eventAssets.map((src, i) => {
    // Check if we have a date or specific tag in translations or fall back
    const dateLabel = t.galleryPage.events[i]?.tag === "Event" ? "June 29, 2025" : undefined;
    return {
      type: "event" as const,
      src,
      alt: t.galleryPage.events[i]?.alt || "",
      label: t.galleryPage.events[i]?.label || "",
      date: dateLabel,
    };
  });

export const buildItems = (section: "photos" | "videos" | "events", t: any): MediaItem[] => {
  switch (section) {
    case "photos":
      return buildPhotoItems(t);
    case "videos":
      return buildVideoItems(t);
    case "events":
      return buildEventItems(t);
    default:
      return [];
  }
};
