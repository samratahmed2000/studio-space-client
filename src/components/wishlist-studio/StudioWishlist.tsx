"use client";

import Link from "next/link";
import { HeartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlist } from "@/hooks/use-wishlist";
import WishlistStudioCard from "./WishlistStudioCard";

const WishlistSkeleton = () => (
  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        className="overflow-hidden rounded-xl border border-border/70"
      >
        <Skeleton className="aspect-4/3 w-full rounded-none" />

        <div className="space-y-3 p-5">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

const StudioWishlist = () => {
  const { studios, status, loadWishlist } = useWishlist();
  const isLoading = status === "idle" || status === "loading";

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Page Heading */}
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Saved Spaces
          </Badge>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            My Studio <span className="text-destructive">Wishlist</span>
          </h1>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Keep track of the creative spaces you love and come back to book
            them whenever you are ready.
          </p>
        </div>

        {/* Results Count */}
        <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
          <p className="text-sm text-muted-foreground">
            Total{" "}
            <span className="font-semibold text-foreground">
              {status === "ready" ? studios.length : "—"}
            </span>{" "}
            {studios.length === 1 ? "studio" : "studios"}
          </p>
        </div>

        {isLoading ? (
          <WishlistSkeleton />
        ) : status === "error" ? (
          <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <h2 className="text-lg font-semibold">
              Couldn&apos;t load your wishlist
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Please check your connection and try again.
            </p>

            <Button
              type="button"
              className="mt-5"
              onClick={() => void loadWishlist(true)}
            >
              Try Again
            </Button>
          </div>
        ) : studios.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <WishlistStudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <HeartIcon className="size-5" />
            </span>

            <h2 className="mt-3 text-lg font-semibold">
              No saved studios yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Tap the heart on any studio card to save it here for later.
            </p>

            <Link
              href="/studios"
              className={buttonVariants({ className: "mt-5" })}
            >
              Browse Studios
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default StudioWishlist;
