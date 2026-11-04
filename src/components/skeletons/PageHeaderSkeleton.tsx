import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";

interface PageHeaderSkeletonProps {
  className?: string;
  withAction?: boolean;
}

const PageHeaderSkeleton = ({
  className,
  withAction = false,
}: PageHeaderSkeletonProps) => (
  <div
    aria-hidden="true"
    className={cn(
      withAction && "flex flex-wrap items-end justify-between gap-4",
      className,
    )}
  >
    <div className="max-w-2xl">
      <Skeleton className="h-7 w-36 rounded-full" />

      <div className="mt-4">
        <Skeleton className="h-9 w-full max-w-md" />
      </div>

      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full max-w-sm" />
        <Skeleton className="h-4 w-3/4 max-w-xs" />
      </div>
    </div>

    {withAction && (
      <Skeleton className="h-9 w-full rounded-lg sm:w-40" />
    )}
  </div>
);

const SectionHeadingSkeleton = ({ className }: { className?: string }) => (
  <div aria-hidden="true" className={cn("max-w-xl", className)}>
    <Skeleton className="h-7 w-36 rounded-full" />

    <div className="mt-4 space-y-2">
      <Skeleton className="h-9 w-full max-w-sm" />
      <Skeleton className="h-9 w-2/3 max-w-xs" />
    </div>

    <div className="mt-3 space-y-2">
      <Skeleton className="h-4 w-full max-w-md" />
      <Skeleton className="h-4 w-3/4 max-w-sm" />
    </div>
  </div>
);

export { PageHeaderSkeleton, SectionHeadingSkeleton };
export default PageHeaderSkeleton;
