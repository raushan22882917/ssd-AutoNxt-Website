import {
  Cpu,
  Globe,
  Leaf,
  ShieldCheck,
  Zap,
} from "lucide-react";
const HERO_WIDTH = 1675;
const HERO_HEIGHT = 939;

const FEATURE_ICONS = [Leaf, Zap, ShieldCheck, Globe] as const;

export type HeroOverlayText = {
  titlePart1: string;
  titleHighlight: string;
  subtitle: string;
  featureCards: Array<{ title: string; desc: string }>;
  taglineBold: string;
  taglineNormal: string;
  bottomFeatures: Array<{ title: string; desc: string }>;
};

type HeroAutomationSlideProps = {
  backgroundSrc: string;
  content: HeroOverlayText;
  showFloatingCard?: boolean;
  layout?: "full" | "compact";
  variant?: "industry" | "loader" | "automation";
};

export default function HeroAutomationSlide({
  backgroundSrc,
  content,
  showFloatingCard = false,
  layout = "full",
  variant = "automation",
}: HeroAutomationSlideProps) {
  const isIndustry = variant === "industry";
  const isLoader = variant === "loader";
  const containerClass = isIndustry
    ? `relative h-auto sm:h-full flex flex-col justify-start sm:${layout === "compact" ? "justify-start" : "justify-between"} py-3 sm:py-6 md:py-7 lg:py-8`
    : isLoader
    ? `relative h-auto sm:h-full flex flex-col justify-start sm:${layout === "compact" ? "justify-start" : "justify-between"} py-3 sm:py-7 md:py-8 lg:py-10`
    : `relative h-auto sm:h-full flex flex-col justify-start sm:${layout === "compact" ? "justify-start" : "justify-between"} py-3 sm:py-7 md:py-8 lg:py-10`;

  const panelClass = isIndustry
    ? "w-full max-w-[min(100%,620px)] lg:max-w-[43%] xl:max-w-[40%]"
    : isLoader
    ? "w-full max-w-[min(100%,560px)] lg:max-w-[39%] xl:max-w-[36%]"
    : "w-full max-w-[min(100%,640px)] lg:max-w-[45%] xl:max-w-[42%]";
  const panelOffsetClass = isIndustry
    ? "mt-2.5 sm:mt-6 md:mt-7 lg:mt-9"
    : isLoader
    ? "mt-2 sm:mt-5 md:mt-6 lg:mt-8"
    : "mt-2 sm:mt-5 md:mt-6 lg:mt-8";

  const headingClass = isIndustry
    ? "font-display text-[1.5rem] sm:text-[2rem] md:text-[2.35rem] lg:text-[2.6rem] xl:text-[2.9rem] font-bold text-foreground leading-[1.08] tracking-tight mb-2 sm:mb-3"
    : isLoader
    ? "font-display text-[1.35rem] sm:text-[1.85rem] md:text-[2.1rem] lg:text-[2.25rem] xl:text-[2.45rem] font-bold text-foreground leading-[1.1] tracking-tight mb-2 sm:mb-3"
    : "font-display text-[1.55rem] sm:text-[2.1rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.2rem] font-bold text-foreground leading-[1.08] tracking-tight mb-2 sm:mb-3";

  const cardsWrapClass = isIndustry
    ? "mt-2.5 sm:mt-5 max-w-[88%]"
    : isLoader
    ? "mt-2 sm:mt-4 max-w-[78%]"
    : "mt-2.5 sm:mt-5";

  return (
    <div className="flex flex-col sm:block relative w-full h-auto sm:aspect-[1675/939] sm:min-h-[480px] lg:min-h-[540px] overflow-hidden bg-background leading-normal">
      
      {/* ── MOBILE HEADER (Heading + Subheading) ── */}
      <div className="block sm:hidden px-4 pt-5 pb-3">
        <h1 className={headingClass}>
          {content.titlePart1}
          <span className="text-[#0056D2]">{content.titleHighlight}</span>
        </h1>
        <p className="text-[12px] font-bold text-foreground/85 leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      {/* ── IMAGE SECTION (Full screen width on mobile, absolute background on desktop) ── */}
      <div className="relative w-full aspect-[1675/939] px-4 sm:px-0 sm:absolute sm:inset-0 sm:aspect-auto sm:h-full z-10">
        <div className="relative w-full h-full">
          {/* Top Gradient Overlay to fade the top edge of the image into the background */}
          <div className="block sm:hidden absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          
          <img
            src={backgroundSrc}
            alt=""
            width={HERO_WIDTH}
            height={HERO_HEIGHT}
            className="w-full h-full object-cover object-center rounded-xl sm:rounded-none"
            fetchPriority="auto"
            loading="lazy"
            decoding="async"
            aria-hidden
          />

          {/* Mobile Overlay: 3 smaller boxes on the left side of the image */}
          <div className="flex sm:hidden absolute left-[clamp(8px,2vw,16px)] top-1/2 -translate-y-1/2 -mt-[1.1cm] flex-col gap-1 w-[clamp(100px,28vw,135px)] z-20">
            {content.featureCards.slice(0, 3).map((card, i) => {
              const Icon = FEATURE_ICONS[i] || ShieldCheck;
              return (
                <div
                  key={card.title}
                  className="flex items-start gap-1.5 rounded border border-white/70 bg-white/90 backdrop-blur-[2px] shadow-sm p-[clamp(4px,1vw,6px)]"
                >
                  <Icon
                    className="w-[clamp(10px,2.5vw,13px)] h-[clamp(10px,2.5vw,13px)] text-[#0056D2] flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <div className="min-w-0">
                    <p className="text-[clamp(7.5px,1.8vw,9.5px)] font-bold text-[#0056D2] leading-tight mb-0.5 truncate">
                      {card.title}
                    </p>
                    <p className="text-[6.5px] min-[450px]:text-[8px] text-foreground/80 leading-none truncate">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESKTOP TEXT OVERLAY & MOBILE TAGLINE SECTION ── */}
      <div className="relative w-full h-auto sm:absolute sm:inset-0 flex flex-col justify-start pointer-events-none z-20">
        <div className={`container mx-auto px-4 md:px-6 ${containerClass} pointer-events-auto`}>
          {showFloatingCard && (
            <div className="hidden lg:flex absolute top-10 right-4 md:right-6 rounded-xl border border-white/80 bg-white/88 backdrop-blur-sm shadow-sm px-4 py-3 max-w-[260px] items-start gap-2.5">
              <Cpu className="w-5 h-5 text-[#0056D2] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-bold text-[#0056D2] leading-tight mb-1">
                  {content.bottomFeatures[0]?.title}
                </p>
                <p className="text-xs text-foreground/65 leading-snug">
                  {content.bottomFeatures[0]?.desc}
                </p>
              </div>
            </div>
          )}

          {/* Desktop Only — bold headline text */}
          <div className={`hidden sm:block ${panelClass} ${panelOffsetClass}`}>
            <h1 className={headingClass}>
              {content.titlePart1}
              <span className="text-[#0056D2]">{content.titleHighlight}</span>
            </h1>

            <p className="text-[12px] sm:text-sm md:text-base font-bold text-foreground/85 leading-relaxed max-w-[50ch]">
              {content.subtitle}
            </p>

            <div className={cardsWrapClass}>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {content.featureCards.slice(0, 2).map((card, i) => {
                  const Icon = FEATURE_ICONS[i];
                  return (
                    <div
                      key={card.title}
                      className="flex items-start gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-white/80 bg-white/85 backdrop-blur-sm shadow-sm px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3.5"
                    >
                      <Icon
                        className="w-4 h-4 sm:w-5 sm:h-5 text-[#0056D2] flex-shrink-0 mt-0.5"
                        strokeWidth={1.75}
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[#0056D2] leading-tight mb-0.5">
                          {card.title}
                        </p>
                        <p className="text-[9px] sm:text-[10px] md:text-xs text-foreground/70 leading-snug">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {content.featureCards[2] && (
                <div className={isLoader ? "mt-1.5 sm:mt-3 ml-[8%] sm:ml-[12%] w-[72%] sm:w-[68%] rotate-[-1deg]" : "mt-1.5 sm:mt-3 ml-[18%] sm:ml-[22%] w-[62%] sm:w-[56%] rotate-[-2deg]"}>
                  <div className="flex items-start gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-white/80 bg-white/90 backdrop-blur-sm shadow-sm px-2.5 py-2.5 sm:px-3 sm:py-3 md:px-4 md:py-3.5">
                    <ShieldCheck
                      className="w-4 h-4 sm:w-5 sm:h-5 text-[#0056D2] flex-shrink-0 mt-0.5"
                      strokeWidth={1.75}
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[#0056D2] leading-tight mb-0.5">
                        {content.featureCards[2].title}
                      </p>
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-foreground/70 leading-snug">
                        {content.featureCards[2].desc}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom — tagline only */}
          {layout === "full" && (
            <div className="mt-2.5 sm:mt-4 lg:mt-0 pb-4 sm:pb-0">
              <div className="mb-2">
                <p className="text-sm sm:text-base md:text-lg font-bold text-[#0056D2] leading-snug">
                  {content.taglineBold}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed">
                  {content.taglineNormal}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
