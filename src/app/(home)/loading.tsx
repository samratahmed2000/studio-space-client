import { Skeleton } from "@/components/ui/skeleton";
import { CategoryGridSkeleton } from "@/components/skeletons/CategoryCardSkeleton";
import { SectionHeadingSkeleton } from "@/components/skeletons/PageHeaderSkeleton";
import { StudioGridSkeleton } from "@/components/skeletons/StudioCardSkeleton";

const HomeLoading = () => (
  <main aria-busy="true" className="flex-1">
    {/* Hero */}
    <section
      aria-hidden="true"
      className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-black/25" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Skeleton className="h-7 w-64 max-w-full rounded-full bg-white/15" />

          <div className="mt-5 space-y-3">
            <Skeleton className="h-11 w-full max-w-xl bg-white/15 sm:h-16 lg:h-20" />
            <Skeleton className="h-11 w-3/4 max-w-md bg-white/15 sm:h-16 lg:h-20" />
          </div>

          <div className="mt-6 space-y-2">
            <Skeleton className="h-5 w-full max-w-lg bg-white/10" />
            <Skeleton className="h-5 w-2/3 max-w-md bg-white/10" />
          </div>

          <Skeleton className="mt-8 h-11 w-full rounded-lg bg-white/20 sm:w-40" />
        </div>
      </div>
    </section>

    {/* Studio Categories */}
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <SectionHeadingSkeleton className="max-w-2xl" />
          <Skeleton className="h-11 w-full shrink-0 rounded-lg sm:w-40" />
        </div>

        <CategoryGridSkeleton count={5} className="mt-8" />
      </div>
    </section>

    {/* Featured Studios */}
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        <SectionHeadingSkeleton className="mb-8" />
        <StudioGridSkeleton count={6} label="Loading featured studios" />
      </div>
    </section>
  </main>
);

export default HomeLoading;
