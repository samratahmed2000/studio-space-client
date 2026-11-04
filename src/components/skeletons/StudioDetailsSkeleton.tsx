import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const StudioDetailsSkeleton = () => (
  <main
    aria-busy="true"
    aria-label="Loading studio details"
    className="min-h-screen border-b border-border/60 bg-background"
  >
    {/* Image Carousel */}
    <div className="relative h-[55vh] max-h-150 min-h-64 w-full overflow-hidden border-b border-border/60 bg-muted sm:h-[65vh] lg:h-[80vh]">
      <Skeleton className="size-full rounded-none" />

      <div className="absolute right-4 bottom-6 left-4 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:px-6 lg:px-8">
        <Skeleton className="h-7 w-32 rounded-full bg-background/40" />
        <Skeleton className="h-7 w-24 rounded-full bg-background/40" />
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      {/* Navigation Actions */}
      <Skeleton className="mb-8 h-4 w-32 sm:mb-10" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
        {/* Main Details */}
        <div className="min-w-0 space-y-8 lg:col-span-2">
          {/* Studio Header */}
          <div className="space-y-3">
            <Skeleton className="h-7 w-36 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-10 w-full max-w-lg sm:h-12" />
              <Skeleton className="h-10 w-2/3 max-w-sm sm:h-12 lg:h-14" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="size-4 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Overview & Pricing */}
          <Card className="border-border/70 bg-card/60 shadow-sm">
            <CardHeader className="space-y-2 pb-3">
              <Skeleton className="h-5 w-64 max-w-full" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/20 p-3"
                  >
                    <Skeleton className="size-10 shrink-0 rounded-lg" />

                    <div className="min-w-0 flex-1 space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Description */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <div className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Skeleton className="size-8 shrink-0 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Host Information */}
          <Card className="border-border/70 bg-card/60 shadow-sm">
            <CardHeader className="space-y-2 pb-3">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>

              <Skeleton className="h-4 w-64 max-w-full" />
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-3.5">
                <Skeleton className="size-12 shrink-0 rounded-full sm:size-14" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-1">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>

              <Skeleton className="h-4 w-56 max-w-full" />
            </CardHeader>

            <Separator />

            <CardContent className="space-y-4 pt-4">
              <div className="space-y-3 rounded-lg border border-border/70 bg-muted/20 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <Skeleton className="h-px w-full" />

                <div className="flex items-center justify-between gap-3">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <Skeleton className="h-16 w-full rounded-lg" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2.5 pt-2">
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="mx-auto h-3 w-48 max-w-full" />
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  </main>
);

export default StudioDetailsSkeleton;
