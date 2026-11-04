import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ListingCardSkeleton = () => (
  <div
    aria-hidden="true"
    className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm"
  >
    {/* Image, Title, Location */}
    <div className="flex gap-3 p-4">
      <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 divide-x divide-border/70 border-t border-border/70 bg-muted/20">
      {[0, 1, 2].map((item) => (
        <div key={item} className="px-2 py-3">
          <Skeleton className="mx-auto h-3 w-12" />
          <Skeleton className="mx-auto mt-1.5 h-4 w-14" />
        </div>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center justify-end gap-1.5 border-t border-border/70 p-3">
      <Skeleton className="h-9 flex-1 rounded-lg" />
      <Skeleton className="size-9 rounded-lg" />
      <Skeleton className="size-9 rounded-lg" />
    </div>
  </div>
);

interface ListingCardsSkeletonProps {
  count?: number;
}

const ListingCardsSkeleton = ({ count = 3 }: ListingCardsSkeletonProps) => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading your studio listings"
    className="mt-6 space-y-4 lg:hidden"
  >
    <span className="sr-only">Loading your studio listings…</span>

    {Array.from({ length: count }, (_, index) => (
      <ListingCardSkeleton key={index} />
    ))}
  </div>
);

const ListingTableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div
    aria-hidden="true"
    className="mt-6 hidden overflow-hidden rounded-xl border border-border/70 lg:block"
  >
    <Table className="min-w-4xl">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="h-11 px-4">Studio</TableHead>
          <TableHead className="h-11 px-4">Category</TableHead>
          <TableHead className="h-11 px-4 text-right">Hourly Rate</TableHead>
          <TableHead className="h-11 px-4 text-right">Deposit</TableHead>
          <TableHead className="h-11 px-4 text-right">Capacity</TableHead>
          <TableHead className="h-11 px-4 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }, (_, index) => (
          <TableRow key={index}>
            <TableCell className="px-4 py-3 whitespace-normal">
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-20 shrink-0 rounded-lg" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </TableCell>

            <TableCell className="px-4">
              <Skeleton className="h-4 w-24" />
            </TableCell>

            <TableCell className="px-4">
              <Skeleton className="ml-auto h-4 w-16" />
            </TableCell>

            <TableCell className="px-4">
              <Skeleton className="ml-auto h-4 w-14" />
            </TableCell>

            <TableCell className="px-4">
              <Skeleton className="ml-auto h-4 w-8" />
            </TableCell>

            <TableCell className="px-4">
              <div className="flex items-center justify-end gap-1.5">
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="size-8 rounded-lg" />
                <Skeleton className="size-8 rounded-lg" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export { ListingCardSkeleton, ListingCardsSkeleton, ListingTableSkeleton };
