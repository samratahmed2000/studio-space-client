"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    src: "/assets/hero/photography-studio.png",
    alt: "Photographer capturing a portrait in a bright studio",
    label: "Photography Studio",
  },
  {
    src: "/assets/hero/cinema-set.png",
    alt: "Film crew working on a cinema set",
    label: "Cinema Set",
  },
  {
    src: "/assets/hero/podcast-room.png",
    alt: "Podcast studio with microphones and headphones",
    label: "Podcast Room",
  },
  {
    src: "/assets/hero/music-suites.png",
    alt: "Music producer working at a recording console",
    label: "Music Suite",
  },
  {
    src: "/assets/hero/art-workshop.png",
    alt: "People creating crafts at an art workshop",
    label: "Art Workshop",
  },
  {
    src: "/assets/hero/film-show.png",
    alt: "Performers on a lit theatre stage",
    label: "Theatre Stage",
  },
] as const;

const AUTOPLAY_DELAY = 4000;

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden bg-neutral-950"
    >
      <Carousel
        aria-label="Featured creative spaces"
        setApi={setApi}
        opts={{ loop: true }}
        className="absolute inset-0 h-full w-full [&>div]:h-full"
      >
        <CarouselContent className="ml-0 h-full">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.src} className="h-full pl-0">
              <div className="relative h-full w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/25" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/10" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-white/25 bg-white/10 px-3 text-xs font-medium text-white backdrop-blur"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Creative spaces for every project
          </Badge>

          <h1
            id="hero-heading"
            className="mt-5 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
          >
            Find Your Perfect{" "}
            <span className="text-destructive">Creative Space.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
            Discover and book photography studios, film sets, podcast rooms,
            music suites, and art workshops - all by the hour.
          </p>

          <div className="mt-8">
            <Link
              href="/studios"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group h-11 w-full gap-2 bg-background px-6 text-sm text-foreground shadow-lg shadow-black/20 hover:bg-background/90 sm:w-auto",
              )}
            >
              Explore Studios
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to ${slide.label}`}
                  aria-current={current === index ? "true" : undefined}
                  className="group flex h-8 items-center px-1"
                >
                  <span
                    className={cn(
                      "h-1 rounded-full transition-all",
                      current === index
                        ? "w-7 bg-white"
                        : "w-1.5 bg-white/40 group-hover:bg-white/70",
                    )}
                  />
                </button>
              ))}
            </div>
            <span className="hidden text-xs font-medium text-white/70 sm:inline">
              {heroSlides[current].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
