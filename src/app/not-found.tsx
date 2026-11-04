import Link from "next/link";
import { ArrowRightIcon, CompassIcon, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = () => {
  return (
    <main className="flex flex-1 items-center justify-center">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card px-6 py-14 text-center shadow-sm sm:px-12 sm:py-20">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-destructive/10 blur-3xl" />
            <div className="absolute -right-16 -bottom-24 size-64 rounded-full bg-muted blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
            <Badge
              variant="outline"
              className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-destructive"
              />
              Error 404
            </Badge>

            <p
              aria-hidden="true"
              className="mt-6 font-heading text-7xl font-semibold tracking-tight text-foreground/10 sm:text-8xl"
            >
              404
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              This page is <span className="text-destructive">off set.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              The page you are looking for does not exist, may have been moved,
              or the studio is no longer available. Let&apos;s get you back to
              the action.
            </p>

            <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group h-11 w-full gap-2 px-6 sm:w-auto",
                )}
              >
                <HomeIcon className="size-4" />
                Back to Homepage
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/studios"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full gap-2 px-6 sm:w-auto",
                )}
              >
                <CompassIcon className="size-4" />
                Browse Studios
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <Link
                href="/my-bookings"
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                My Bookings
              </Link>
              <span aria-hidden="true" className="text-border">
                •
              </span>
              <Link
                href="/studio-wishlist"
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                My Wishlist
              </Link>
              <span aria-hidden="true" className="text-border">
                •
              </span>
              <Link
                href="/add-studio"
                className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                List a Studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
