import getStudioDetailsData from "@/data-fetch/getStudioDetailsData";
import getStudioRatings from "@/data-fetch/getStudioRatings";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  CheckIcon,
  ChevronLeftIcon,
  MapPinIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BookingCard from "@/components/booking/BookingCard";
import StudioImageCarousel from "@/components/studio/StudioImageCarousel";
import HostInfoCard from "@/components/studio/HostInfoCard";
import EditStudioDetails from "@/components/studio/EditStudioDetails";
import StudioRatingCard from "@/components/studio/StudioRatingCard";
import { auth } from "@/lib/auth";

const getStudio = cache((id: string) => getStudioDetailsData({ id }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) {
    notFound();
  }

  const title = studio.title || "Studio Details";
  const description =
    studio.description?.trim().slice(0, 160) ||
    `View details, amenities, and hourly pricing for ${title} on StudioSpace.`;

  return {
    title: `${title} | StudioSpace`,
    description,
  };
};

const StudioDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const studioDetails = await getStudio(id);

  if (!studioDetails) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const viewerEmail = session?.user?.email?.trim().toLowerCase();
  const isOwner = Boolean(
    viewerEmail &&
      studioDetails.hostEmail?.trim().toLowerCase() === viewerEmail,
  );

  const { ratings, viewerRating } = await getStudioRatings(studioDetails._id);

  const {
    imageUrl,
    imageUrls,
    category,
    title,
    location,
    description,
    amenitiesList,
    hourlyRate = 0,
    securityDeposit = 0,
    maxCapacity,
  } = studioDetails;

  return (
    <main className="min-h-screen border-b border-border/60 bg-background">
      {/* Studio Image Carousel */}
      <StudioImageCarousel
        imageUrl={imageUrl}
        imageUrls={imageUrls}
        title={title}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Navigation Actions */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/studios"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeftIcon className="size-4" />
            Back to Studios
          </Link>

          {isOwner && (
            <EditStudioDetails
              studioDetails={studioDetails}
              className="w-full sm:w-auto"
            />
          )}
        </div>

        {/* Studio Content */}
        <div
          className={`grid grid-cols-1 gap-8 lg:items-start lg:gap-10 ${
            isOwner ? "lg:grid-cols-1" : "lg:grid-cols-3"
          }`}
        >
          {/* Main Details */}
          <div
            className={`min-w-0 space-y-8 ${isOwner ? "" : "lg:col-span-2"}`}
          >
            {/* Studio Header */}
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-destructive" />
                {Array.isArray(category) ? category.join(", ") : category}
              </Badge>

              <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h1>

              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPinIcon className="size-4 shrink-0 text-destructive" />
                <span className="text-sm font-medium leading-6">
                  {location}
                </span>
              </div>
            </div>

            {/* Overview & Pricing Specs Card */}
            <Card className="border-border/70 shadow-sm bg-card/60">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg font-semibold tracking-tight">
                  Workspace Overview & Pricing
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Core booking parameters, hourly rates, and capacity limits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Hourly Rate */}
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3 bg-muted/20">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <DollarSignIcon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Hourly Rate
                      </p>
                      <p className="text-lg font-bold tracking-tight text-foreground truncate">
                        ${Number(hourlyRate)}
                        <span className="text-xs font-normal text-muted-foreground">
                          /hr
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Security Deposit */}
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3 bg-muted/20">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <ShieldCheckIcon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Security Deposit
                      </p>
                      <p className="text-lg font-bold tracking-tight text-foreground truncate">
                        ${Number(securityDeposit)}{" "}
                        <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          100% Refundable
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Max Capacity */}
                  <div className="flex items-center gap-3 rounded-lg border border-border/70 p-3 bg-muted/20">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <UsersIcon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        Max Capacity
                      </p>
                      <p className="text-lg font-bold tracking-tight text-foreground truncate">
                        {maxCapacity ?? "—"}
                        <span className="text-xs font-normal text-muted-foreground">
                          {" "}
                          {maxCapacity === 1 ? "Person" : "People"} max
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                About this space
              </h2>

              <p className="text-sm leading-5 text-muted-foreground sm:text-base whitespace-pre-line">
                {description}
              </p>
            </div>

            {/* Amenities */}
            <div className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Space Amenities
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Essential features and facilities available in this space.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3">
                {(amenitiesList ?? []).map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <CheckIcon className="size-4" />
                    </span>
                    <span className="font-medium text-foreground/80">
                      {amenity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Ratings (visible to everyone except the studio's owner) */}
            {!isOwner && (
              <StudioRatingCard
                studioId={studioDetails._id}
                ratings={ratings}
                viewerRating={viewerRating}
                isLoggedIn={Boolean(session?.user)}
              />
            )}

            {/* Host Information Card */}
            <HostInfoCard studioDetails={studioDetails} />
          </div>

          {/* Booking Sidebar (hidden for the host's own studio) */}
          {!isOwner && (
            <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-1">
              <BookingCard studioDetails={studioDetails} />
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
