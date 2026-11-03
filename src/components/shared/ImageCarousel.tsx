"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt?: string;
  label?: string;
}

export type SlideItem = string | CarouselSlide;

export interface ImageCarouselProps {
  slides: SlideItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  showLabel?: boolean;
  className?: string;
  carouselClassName?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  sizes?: string;
  priorityFirst?: boolean;
  indicatorsClassName?: string;
  ariaLabel?: string;
}

const ImageCarousel = ({
  slides,
  autoplay = true,
  autoplayDelay = 4000,
  showIndicators = true,
  showArrows = false,
  showLabel = true,
  className,
  carouselClassName,
  overlayClassName,
  children,
  sizes = "100vw",
  priorityFirst = true,
  indicatorsClassName,
  ariaLabel = "Image carousel",
}: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Normalize slides
  const normalizedSlides: CarouselSlide[] = useMemo(() => {
    const result: CarouselSlide[] = [];
    for (let idx = 0; idx < slides.length; idx++) {
      const item = slides[idx];
      if (typeof item === "string") {
        const trimmed = item.trim();
        if (trimmed) {
          result.push({
            src: trimmed,
            alt: `Slide ${idx + 1}`,
            label: `Photo ${idx + 1}`,
          });
        }
      } else if (item && item.src && item.src.trim()) {
        result.push({
          src: item.src.trim(),
          alt: item.alt || item.label || `Slide ${idx + 1}`,
          label: item.label || `Photo ${idx + 1}`,
        });
      }
    }
    return result;
  }, [slides]);

  // Sync current slide index
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Autoplay
  useEffect(() => {
    if (!api || !autoplay || normalizedSlides.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        api.scrollNext();
      }
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [api, autoplay, autoplayDelay, normalizedSlides.length]);

  // Fallback: No slides
  if (normalizedSlides.length === 0) {
    return (
      <div
        className={cn(
          "relative flex min-h-64 items-center justify-center bg-muted text-muted-foreground",
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="size-10 opacity-40" />
          <p className="text-sm">No images available</p>
        </div>
        {children}
      </div>
    );
  }

  // Single slide
  if (normalizedSlides.length === 1) {
    const singleSlide = normalizedSlides[0];
    return (
      <div className={cn("relative overflow-hidden bg-neutral-950", className)}>
        <div className="relative h-full w-full">
          <Image
            src={singleSlide.src}
            alt={singleSlide.alt || "Image"}
            fill
            sizes={sizes}
            priority={priorityFirst}
            className="object-cover"
          />
          {overlayClassName && (
            <div
              className={cn("absolute inset-0 pointer-events-none", overlayClassName)}
            />
          )}
        </div>
        {children}
      </div>
    );
  }

  const currentSlide = normalizedSlides[current] || normalizedSlides[0];

  return (
    <div className={cn("relative overflow-hidden bg-neutral-950", className)}>
      <Carousel
        aria-label={ariaLabel}
        setApi={setApi}
        opts={{ loop: true }}
        className={cn("absolute inset-0 h-full w-full [&>div]:h-full", carouselClassName)}
      >
        <CarouselContent className="ml-0 h-full">
          {normalizedSlides.map((slide, index) => (
            <CarouselItem
              key={slide.src + index}
              className="h-full pl-0"
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt || `Photo ${index + 1}`}
                  fill
                  sizes={sizes}
                  loading={index === 0 && priorityFirst ? "eager" : "lazy"}
                  priority={index === 0 && priorityFirst}
                  className="object-cover select-none"
                />
                {overlayClassName && (
                  <div
                    className={cn(
                      "absolute inset-0 pointer-events-none",
                      overlayClassName,
                    )}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Optional Left / Right Arrow Controls */}
      {showArrows && normalizedSlides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer shadow-md"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer shadow-md"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </>
      )}

      {/* Children content (e.g. Hero headings / actions) */}
      {children}

      {/* Signature Dash / Pill Indicators */}
      {showIndicators && normalizedSlides.length > 1 && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-5 z-20 pointer-events-none",
            indicatorsClassName,
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 pointer-events-auto">
              <div className="flex items-center gap-0.5">
                {normalizedSlides.map((slide, index) => (
                  <button
                    key={slide.src + index}
                    type="button"
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to ${slide.label || `slide ${index + 1}`}`}
                    aria-current={current === index ? "true" : undefined}
                    className="group flex h-8 items-center px-1 cursor-pointer"
                  >
                    <span
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        current === index
                          ? "w-7 bg-white shadow-sm"
                          : "w-1.5 bg-white/40 group-hover:bg-white/70",
                      )}
                    />
                  </button>
                ))}
              </div>

              {showLabel && currentSlide?.label && (
                <span className="hidden text-xs font-medium text-white/80 drop-shadow-sm sm:inline">
                  {currentSlide.label}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { ImageCarousel };
export default ImageCarousel;
