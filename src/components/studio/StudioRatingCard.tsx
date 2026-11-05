"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon, StarIcon } from "lucide-react";
import { cn } from "cn";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { getRatingSummary } from "@/lib/rating";
import type { StudioRating } from "@/types/type";

interface StudioRatingCardProps {
  studioId: string;
  ratings: StudioRating[];
  viewerRating: number | null;
  isLoggedIn: boolean;
}

const RATING_VALUES = [1, 2, 3, 4, 5] as const;

const formatRating = (value: number) => value.toFixed(1);

const StudioRatingCard = ({
  studioId,
  ratings,
  viewerRating,
  isLoggedIn,
}: StudioRatingCardProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(viewerRating ?? 0);
  const [hovered, setHovered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { average, count } = getRatingSummary(ratings);
  const activeValue = hovered || selected;
  const hasRated = typeof viewerRating === "number" && viewerRating > 0;

  const handleRate = async (value: number) => {
    if (value < 1 || isSubmitting) return;

    setSelected(value);
    setIsSubmitting(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ studioId, rating: value }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save your rating.");
      }

      toast.add({
        type: "success",
        title: "Rating Submitted",
        description: `Thanks! You rated this studio ${value} out of 5.`,
      });

      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Rating Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-border/70 shadow-sm bg-card/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-base sm:text-lg font-semibold tracking-tight">
            Ratings &amp; Reviews
          </CardTitle>
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center gap-1 text-xs font-normal px-4 py-3 border-border/80 leading-none"
          >
            <StarIcon
              aria-hidden="true"
              className={cn(
                "size-3 shrink-0",
                count > 0
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/40",
              )}
            />
            {count > 0 ? `${formatRating(average)} / 5` : "Not rated yet"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {count > 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/20 p-3.5">
            <span className="text-3xl font-bold tracking-tight">
              {formatRating(average)}
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {RATING_VALUES.map((value) => (
                  <StarIcon
                    key={value}
                    className={cn(
                      "size-4",
                      value <= Math.round(average)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {count} {count === 1 ? "rating" : "ratings"} total
              </p>
            </div>
          </div>
        )}

        {count > 0 && <Separator />}

        {isLoggedIn ? (
          hasRated ? (
            <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">
                  Thanks for rating this studio!
                </p>
              </div>

              <div
                className="flex items-center gap-0.5"
                aria-label={`You rated this studio ${viewerRating} out of 5`}
              >
                {RATING_VALUES.map((value) => (
                  <StarIcon
                    key={value}
                    aria-hidden="true"
                    className={cn(
                      "size-5",
                      value <= (viewerRating ?? 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Rate This Studio</p>
                <p className="text-xs text-muted-foreground">
                  Select a star to submit your rating instantly.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div
                  role="radiogroup"
                  aria-label="Studio rating"
                  className="flex items-center gap-0.5"
                >
                  {RATING_VALUES.map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={selected === value}
                      aria-label={`${value} star${value === 1 ? "" : "s"}`}
                      title={`${value} star${value === 1 ? "" : "s"}`}
                      disabled={isSubmitting}
                      onClick={() => handleRate(value)}
                      onMouseEnter={() => setHovered(value)}
                      onMouseLeave={() => setHovered(0)}
                      className="cursor-pointer rounded-md p-1 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-60"
                    >
                      <StarIcon
                        aria-hidden="true"
                        className={cn(
                          "size-6 transition-colors",
                          value <= activeValue
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/40",
                        )}
                      />
                    </button>
                  ))}
                </div>

                {isSubmitting && (
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Loader2Icon className="size-3.5 animate-spin" />
                    Saving...
                  </span>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-3 rounded-lg border border-dashed border-border/70 bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Sign in to share your experience and rate this studio.
            </p>
            <Link
              href={`/login?redirectTo=/studios/${studioId}`}
              className={buttonVariants({ variant: "outline" })}
            >
              Sign in to Rate
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { StudioRatingCard };
export default StudioRatingCard;
