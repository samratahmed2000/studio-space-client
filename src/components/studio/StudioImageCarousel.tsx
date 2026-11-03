"use client";

import ImageCarousel, {
  CarouselSlide,
} from "@/components/shared/ImageCarousel";

interface StudioImageCarouselProps {
  imageUrl?: string;
  imageUrls?: string[];
  title?: string;
}

const StudioImageCarousel = ({
  imageUrl,
  imageUrls,
  title,
}: StudioImageCarouselProps) => {
  const list: string[] = [];

  if (Array.isArray(imageUrls)) {
    for (const url of imageUrls) {
      if (typeof url === "string" && url.trim() && !list.includes(url.trim())) {
        list.push(url.trim());
      }
    }
  }

  if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
    if (!list.includes(imageUrl.trim())) {
      list.unshift(imageUrl.trim());
    }
  }

  const slides: CarouselSlide[] = list.map((src, index) => ({
    src,
    alt: `${title ?? "Studio space"} - Photo ${index + 1}`,
    label: `Photo ${index + 1} of ${list.length}`,
  }));

  return (
    <ImageCarousel
      slides={slides}
      autoplay={true}
      autoplayDelay={4000}
      showIndicators={true}
      showLabel={true}
      className="relative h-[55vh] min-h-64 max-h-150 w-full overflow-hidden border-b border-border/60 sm:h-[65vh] lg:h-[80vh]"
      overlayClassName="bg-linear-to-t from-black/60 via-transparent to-black/10"
      ariaLabel={title ?? "Studio space photos"}
    />
  );
};

export { StudioImageCarousel };
export default StudioImageCarousel;
