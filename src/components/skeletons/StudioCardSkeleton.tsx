import { cn } from "cn";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StudioCardSkeleton = ({ className }: { className?: string }) => (
  <Card
    aria-hidden="true"
    className={cn(
      "gap-0 overflow-hidden border-border/70 p-0",
      className,
    )}
  >
    {/* Studio Image */}
    <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
      <Skeleton className="size-full rounded-none" />
      <Skeleton className="absolute top-4 left-4 h-6 w-24 rounded-full" />
      <Skeleton className="absolute top-3 right-3 size-9 rounded-full" />
    </div>

    {/* Studio Information */}
    <CardContent className="space-y-4 p-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />

        <div className="flex items-center gap-1.5">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </CardContent>

    {/* Pricing & Action */}
    <CardFooter className="flex items-center justify-between border-t border-border/60 px-5 py-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-3 w-28" />
      </div>

      <Skeleton className="h-9 w-28 rounded-2xl" />
    </CardFooter>
  </Card>
);

interface StudioGridSkeletonProps {
  count?: number;
  className?: string;
  label?: string;
}

const StudioGridSkeleton = ({
  count = 6,
  className,
  label = "Loading studios",
}: StudioGridSkeletonProps) => (
  <div
    role="status"
    aria-busy="true"
    aria-label={label}
    className={cn(
      "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
      className,
    )}
  >
    <span className="sr-only">{label}…</span>

    {Array.from({ length: count }, (_, index) => (
      <StudioCardSkeleton key={index} />
    ))}
  </div>
);

export { StudioCardSkeleton, StudioGridSkeleton };
export default StudioCardSkeleton;
