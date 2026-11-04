import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import {
  ListingCardsSkeleton,
  ListingTableSkeleton,
} from "@/components/skeletons/ListingSkeletons";
import { Skeleton } from "@/components/ui/skeleton";

const MyListingsLoading = () => (
  <main aria-busy="true" className="min-h-screen">
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Heading */}
      <PageHeaderSkeleton withAction />

      {/* Results Count */}
      <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Mobile / tablet cards */}
      <ListingCardsSkeleton count={3} />

      {/* Desktop table */}
      <ListingTableSkeleton rows={5} />
    </section>
  </main>
);

export default MyListingsLoading;
