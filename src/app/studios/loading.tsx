import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import { StudioGridSkeleton } from "@/components/skeletons/StudioCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const StudiosLoading = () => (
  <main aria-busy="true" className="min-h-screen">
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <PageHeaderSkeleton className="mb-6 max-w-2xl" />

      {/* Search */}
      <div className="mb-6 flex justify-end">
        <div className="flex w-full max-w-xl items-center gap-2">
          <Skeleton className="h-11 flex-1 rounded-[min(var(--radius-md),12px)]" />
          <Skeleton className="h-11 w-20 shrink-0 rounded-lg" />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Studio Grid */}
      <StudioGridSkeleton count={6} />
    </section>
  </main>
);

export default StudiosLoading;
