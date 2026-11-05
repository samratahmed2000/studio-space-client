"use client";

import { Studio } from "@/types/type";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight, Clock, MapPin, Star, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";
import { getRatingSummary } from "@/lib/rating";
import { WishlistButton } from "../wishlist-studio/WishlistButton";

const getCategoryLabel = (category: Studio["category"]) => {
  if (Array.isArray(category)) {
    return category
      .map((item) => item.title)
      .filter(Boolean)
      .join(", ");
  }

  return category ?? "";
};

const StudioCard = ({ studio }: { studio: Studio }) => {
  const router = useRouter();
  const {
    _id,
    category,
    title,
    hourlyRate,
    securityDeposit,
    maxCapacity,
    location,
    imageUrl,
    imageUrls,
    ratings,
  } = studio;

  const { average, count } = getRatingSummary(ratings);

  const displayImage =
    imageUrl ||
    (Array.isArray(imageUrls) && imageUrls.length > 0
      ? imageUrls[0]
      : undefined);

  const categoryLabel = getCategoryLabel(category);

  return (
    <Link href={`/studios/${_id}`} key={_id}>
      <Card className="group gap-0 overflow-hidden border-border/70 p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Studio Image */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={title || "Image"}
              fill
              priority={true}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              Loading...
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
            <div className="flex items-start justify-between gap-2">
              <h2 className="line-clamp-1 text-lg font-semibold tracking-tight">
                {title}
              </h2>

              <span
                className="flex shrink-0 items-center gap-1 text-sm"
                aria-label={
                  count > 0
                    ? `Rated ${average.toFixed(1)} out of 5 by ${count} ${count === 1 ? "guest" : "guests"}`
                    : "No ratings yet"
                }
              >
                <Star
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    count > 0
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/40",
                  )}
                />
                <span className="font-medium tabular-nums">
                  {average.toFixed(1)}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  ({count})
                </span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Studio Details */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>Up to {maxCapacity}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>Hourly rental</span>
            </div>
          </div>
        </CardContent>

        {/* Pricing & Action */}
        <CardFooter className="flex items-center justify-between border-t border-border/60 px-5 py-4">
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

          <Button
            size="lg"
            className="gap-2 rounded-2xl cursor-pointer"
            onClick={() => router.push(`/studios/${_id}`)}
          >
            View Studio
            <ArrowUpRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default StudioCard;
