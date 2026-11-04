import { cn } from "cn";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => (
  <Card aria-hidden="true" className="h-full gap-0 p-5">
    <div className="flex items-start justify-between gap-4">
      <Skeleton className="size-11 rounded-xl" />
      <Skeleton className="size-4 rounded-sm" />
    </div>

    <Skeleton className="mt-5 h-5 w-2/3" />

    <div className="mt-3 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </Card>
);

interface CategoryGridSkeletonProps {
  count?: number;
  className?: string;
}

const CategoryGridSkeleton = ({
  count = 5,
  className,
}: CategoryGridSkeletonProps) => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading studio categories"
    className={cn(
      "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
      className,
    )}
  >
    <span className="sr-only">Loading studio categories…</span>

    {Array.from({ length: count }, (_, index) => (
      <CategoryCardSkeleton key={index} />
    ))}
  </div>
);

export { CategoryCardSkeleton, CategoryGridSkeleton };
export default CategoryCardSkeleton;
