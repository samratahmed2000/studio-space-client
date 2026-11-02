import getStudioDetailsData from "@/data-fetch/getStudioDetailsData";
import { Studio } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import {
  CheckIcon,
  ChevronLeftIcon,
  MapPinIcon,
  Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingCard } from "@/components/booking/BookingCard";
import EditStudioDetails from "@/components/studio/EditStudioDetails";

const StudioDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const studioDetails: Studio = await getStudioDetailsData({ id });

  const { imageUrl, category, title, location, description, amenitiesList } =
    studioDetails;

  return (
    <main className="min-h-screen border-b border-border/60 bg-background">
      {/* Hero Image */}
      <div className="relative h-[55vh] min-h-64 max-h-150 w-full overflow-hidden border-b border-border/60 bg-muted sm:h-[65vh] lg:h-[80vh]">
        <Image
          src={imageUrl!}
          alt={title ?? "Studio image"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-linear-to-t from-background/20 via-transparent to-transparent" />
      </div>

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

          <div className="flex flex-wrap items-center gap-2">
            <EditStudioDetails studioDetails={studioDetails} />

            <Button variant="destructive" size="sm" className="h-9 gap-2">
              <Trash2Icon className="size-3.5" />
              Delete Studio
            </Button>
          </div>
        </div>

        {/* Studio Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          {/* Main Details */}
          <div className="min-w-0 space-y-8 lg:col-span-2">
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

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                About this space
              </h2>

              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
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
          </div>

          {/* Booking Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-1">
            <BookingCard studioDetails={studioDetails} />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
