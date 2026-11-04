import { cn } from "cn";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BookingCardSkeleton = ({ className }: { className?: string }) => (
  <Card aria-hidden="true" className={cn("w-full py-0", className)}>
    <CardContent className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
      {/* Studio Image */}
      <Skeleton className="h-40 w-full shrink-0 rounded-lg sm:h-32 sm:w-48" />

      {/* Booking Information */}
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          <div className="flex items-center gap-1.5">
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Total & Actions */}
      <div className="flex shrink-0 items-center justify-between gap-4 border-t pt-4 sm:w-36 sm:flex-col sm:border-t-0 sm:border-l sm:py-2 sm:pl-5">
        <div className="space-y-2 sm:text-center">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-5 w-20" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-16 rounded-[min(var(--radius-md),12px)]" />
          <Skeleton className="h-7 w-16 rounded-[min(var(--radius-md),12px)]" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface BookingListSkeletonProps {
  count?: number;
  className?: string;
}

const BookingListSkeleton = ({
  count = 3,
  className,
}: BookingListSkeletonProps) => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading bookings"
    className={cn("space-y-4", className)}
  >
    <span className="sr-only">Loading bookings…</span>

    {Array.from({ length: count }, (_, index) => (
      <BookingCardSkeleton key={index} />
    ))}
  </div>
);

export { BookingCardSkeleton, BookingListSkeleton };
export default BookingCardSkeleton;
