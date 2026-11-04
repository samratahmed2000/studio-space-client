import { BookingListSkeleton } from "@/components/skeletons/BookingCardSkeleton";
import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const MyBookingsLoading = () => (
  <main aria-busy="true" className="min-h-screen">
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Heading */}
      <PageHeaderSkeleton className="max-w-2xl" />

      {/* Results Count */}
      <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
        <Skeleton className="h-4 w-28" />
      </div>

      <BookingListSkeleton count={3} className="mt-6" />
    </section>
  </main>
);

export default MyBookingsLoading;
