"use client";

import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import ImageCarousel, { CarouselSlide } from "@/components/shared/ImageCarousel";
import { cn } from "@/lib/utils";

const heroSlides: CarouselSlide[] = [
  {
    src: "/assets/hero/photography-studio.jpg",
    alt: "Photographer capturing a portrait in a bright studio",
    label: "Photography Studio",
  },
  {
    src: "/assets/hero/podcast-room.png",
    alt: "Film crew working on a cinema set",
    label: "Cinema Set",
  },
  {
    src: "/assets/hero/cinema-set.jpg",
    alt: "Podcast studio with microphones and headphones",
    label: "Podcast Room",
  },
  {
    src: "/assets/hero/music-suites.jpg",
    alt: "Music producer working at a recording console",
    label: "Music Suite",
  },
  {
    src: "/assets/hero/art-studio.png",
    alt: "People creating crafts at an art workshop",
    label: "Art Workshop",
  },
  {
    src: "/assets/hero/theater.png",
    alt: "Performers on a lit theatre stage",
    label: "Theatre Stage",
  },
];

const Hero = () => {
  return (
    <section aria-labelledby="hero-heading">
      <ImageCarousel
        slides={heroSlides}
        autoplay={true}
        autoplayDelay={4000}
        showIndicators={true}
        showLabel={true}
        className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden bg-neutral-950"
        overlayClassName="bg-linear-to-r from-black/85 via-black/50 to-black/25 after:absolute after:inset-0 after:bg-linear-to-t after:from-black/70 after:via-transparent after:to-black/10"
        ariaLabel="Featured creative spaces"
      >
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
      </ImageCarousel>
    </section>
  );
};

export default Hero;
