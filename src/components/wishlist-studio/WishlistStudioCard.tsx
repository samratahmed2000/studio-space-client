"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Studio } from "@/types/type";
import { WishlistButton } from "./WishlistButton";

const getCategoryLabel = (category: Studio["category"]) => {
  if (Array.isArray(category)) {
    return category
      .map((item) => item.title)
      .filter(Boolean)
      .join(", ");
  }

  return category ?? "";
};

const WishlistStudioCard = ({ studio }: { studio: Studio }) => {
  const {
    _id,
    category,
    title,
    hourlyRate = 0,
    securityDeposit = 0,
    maxCapacity,
    location,
    imageUrl,
    imageUrls,
  } = studio;

  const displayImage =
    imageUrl ||
    (Array.isArray(imageUrls) && imageUrls.length > 0
      ? imageUrls[0]
      : undefined);
  const categoryLabel = getCategoryLabel(category);

  return (
    <Card className="group relative gap-0 overflow-hidden border-border/70 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Studio Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={title || "Studio image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}

        {categoryLabel && (
          <Badge
            variant="secondary"
            className="absolute left-4 top-4 max-w-[calc(100%-4.5rem)] truncate rounded-full bg-background/90 px-3 backdrop-blur-sm"
          >
            {categoryLabel}
          </Badge>
        )}

        <WishlistButton
          studio={studio}
          className="absolute right-3 top-3 z-10"
        />
      </div>

      {/* Studio Information */}
      <CardContent className="space-y-4 p-5">
        <div className="space-y-2">
          <Link
            href={`/studios/${_id}`}
            className="line-clamp-1 text-lg font-semibold tracking-tight underline-offset-4 hover:underline"
          >
            {title || "Untitled studio"}
          </Link>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">
              {location || "Location not set"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="size-4" />
            <span>Up to {maxCapacity ?? "—"}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>Hourly rental</span>
          </div>
        </div>
      </CardContent>

      {/* Pricing & Action */}
      <CardFooter className="flex items-center justify-between gap-3 border-t border-border/60 px-5 py-4">
        <div>
          <p className="text-lg font-semibold">
            ${hourlyRate}
            <span className="text-sm font-normal text-muted-foreground">
              /hr
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            ${securityDeposit} security deposit
          </p>
        </div>

        <Link
          href={`/studios/${_id}`}
          className={buttonVariants({
            size: "lg",
            className: "gap-2 rounded-2xl",
          })}
        >
          View Studio
          <ArrowUpRight className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export { WishlistStudioCard };
export default WishlistStudioCard;
