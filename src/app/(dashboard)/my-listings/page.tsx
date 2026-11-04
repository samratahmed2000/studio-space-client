import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, MapPinIcon, PlusIcon } from "lucide-react";
import DeleteStudio from "@/components/studio/DeleteStudio";
import EditStudioDetails from "@/components/studio/EditStudioDetails";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getStudiosData from "@/data-fetch/getStudiosData";
import { Studio } from "@/types/type";

export const metadata: Metadata = {
  title: "My Studio Listings | StudioSpace",
  description: "Manage the studio spaces you have published on StudioSpace.",
};

export const dynamic = "force-dynamic";

const getCategoryLabel = (category: Studio["category"]) => {
  if (Array.isArray(category)) {
    return category
      .map((item) => item.title)
      .filter(Boolean)
      .join(", ");
  }

  return category ?? "";
};

const formatCurrency = (value?: number) =>
  value == null ? "—" : `$${value.toLocaleString("en-US")}`;

const StudioActions = ({
  studio,
  title,
  withViewLabel = false,
}: {
  studio: Studio;
  title: string;
  withViewLabel?: boolean;
}) => (
  <div className="flex items-center justify-end gap-1.5">
    <Link
      href={`/studios/${studio._id}`}
      aria-label={withViewLabel ? undefined : `View ${title}`}
      title={withViewLabel ? undefined : "View studio"}
      className={buttonVariants({
        variant: "outline",
        size: withViewLabel ? "lg" : "icon",
        className: withViewLabel ? "flex-1 gap-1.5" : undefined,
      })}
    >
      {withViewLabel && "View Studio"}
      <ArrowUpRightIcon className="size-4" />
    </Link>

    <EditStudioDetails studioDetails={studio} iconOnly />

    <DeleteStudio studioDetails={studio} iconOnly />
  </div>
);

const StudioMobileCard = ({ studio }: { studio: Studio }) => {
  const title = studio.title ?? "Untitled studio";
  const categoryLabel = getCategoryLabel(studio.category);

  return (
    <article className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
      {/* Image, Title, Location */}
      <div className="flex gap-3 p-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
          {studio.imageUrl ? (
            <Image
              src={studio.imageUrl}
              alt={studio.title ?? "Studio image"}
              fill
              sizes="96px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/studios/${studio._id}`}
            className="line-clamp-2 font-semibold tracking-tight underline-offset-4 hover:underline"
          >
            {title}
          </Link>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPinIcon className="size-3.5 shrink-0" />
            <span className="line-clamp-1">
              {studio.location ?? "Location not set"}
            </span>
          </p>

          <Badge
            variant="secondary"
            className="mt-2 max-w-full truncate rounded-full font-normal"
          >
            {categoryLabel || "Uncategorized"}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-3 divide-x divide-border/70 border-t border-border/70 bg-muted/20 text-center">
        <div className="min-w-0 px-2 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Rate
          </dt>
          <dd className="mt-0.5 truncate text-sm font-semibold tabular-nums">
            {studio.hourlyRate == null ? (
              "—"
            ) : (
              <>
                {formatCurrency(studio.hourlyRate)}
                <span className="text-xs font-normal text-muted-foreground">
                  /hr
                </span>
              </>
            )}
          </dd>
        </div>

        <div className="min-w-0 px-2 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Deposit
          </dt>
          <dd className="mt-0.5 truncate text-sm font-semibold tabular-nums">
            {formatCurrency(studio.securityDeposit)}
          </dd>
        </div>

        <div className="min-w-0 px-2 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Capacity
          </dt>
          <dd className="mt-0.5 truncate text-sm font-semibold tabular-nums">
            {studio.maxCapacity ?? "—"}
          </dd>
        </div>
      </dl>

      {/* Actions */}
      <div className="border-t border-border/70 p-3">
        <StudioActions studio={studio} title={title} withViewLabel />
      </div>
    </article>
  );
};

const MyStudioListedPage = async () => {
  const studios: Studio[] = await getStudiosData();

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-destructive"
              />
              Host Panel
            </Badge>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              My Listed<span className="text-destructive"> Studios</span>
            </h1>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Manage the creative spaces published, update their details, or
              remove them permanently.
            </p>
          </div>

          <Link
            href="/add-studio"
            className={buttonVariants({
              size: "lg",
              className: "w-full sm:w-auto",
            })}
          >
            <PlusIcon />
            Add New Studio
          </Link>
        </div>

        {/* Results Count */}
        <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
          <p className="text-sm text-muted-foreground">
            Total{" "}
            <span className="font-semibold text-foreground">
              {studios.length}
            </span>{" "}
            {studios.length === 1 ? "studio" : "studios"}
          </p>
        </div>

        {studios.length > 0 ? (
          <>
            {/* Mobile / tablet cards */}
            <div className="mt-6 space-y-4 lg:hidden">
              {studios.map((studio) => (
                <StudioMobileCard key={studio._id} studio={studio} />
              ))}
            </div>

            {/* Desktop table */}
            <div className="mt-6 hidden overflow-hidden rounded-xl border border-border/70 lg:block">
              <Table className="min-w-4xl">
                <TableCaption className="sr-only">
                  List of your published studios
                </TableCaption>

                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="h-11 px-4">Studio</TableHead>
                    <TableHead className="h-11 px-4">Category</TableHead>
                    <TableHead className="h-11 px-4 text-right">
                      Hourly Rate
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right">
                      Deposit
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right">
                      Capacity
                    </TableHead>
                    <TableHead className="h-11 px-4 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {studios.map((studio) => {
                    const title = studio.title ?? "Untitled studio";
                    const categoryLabel = getCategoryLabel(studio.category);

                    return (
                      <TableRow key={studio._id}>
                        {/* Image, Title, Location */}
                        <TableCell className="px-4 py-3 whitespace-normal">
                          <div className="flex items-center gap-3">
                            <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                              {studio.imageUrl ? (
                                <Image
                                  src={studio.imageUrl}
                                  alt={studio.title ?? "Studio image"}
                                  fill
                                  sizes="80px"
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                  No image
                                </div>
                              )}
                            </div>

                            <div className="min-w-0">
                              <Link
                                href={`/studios/${studio._id}`}
                                className="line-clamp-1 max-w-64 font-medium tracking-tight underline-offset-4 hover:underline"
                              >
                                {title}
                              </Link>

                              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPinIcon className="size-3.5 shrink-0" />
                                <span className="line-clamp-1">
                                  {studio.location ?? "Location not set"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Category */}
                        <TableCell className="px-4 text-muted-foreground">
                          {categoryLabel || "—"}
                        </TableCell>

                        {/* Hourly Rate */}
                        <TableCell className="px-4 text-right tabular-nums">
                          {studio.hourlyRate == null ? (
                            "—"
                          ) : (
                            <>
                              <span className="font-medium">
                                {formatCurrency(studio.hourlyRate)}
                              </span>
                              <span className="text-muted-foreground">/hr</span>
                            </>
                          )}
                        </TableCell>

                        {/* Security Deposit */}
                        <TableCell className="px-4 text-right tabular-nums">
                          {formatCurrency(studio.securityDeposit)}
                        </TableCell>

                        {/* Capacity */}
                        <TableCell className="px-4 text-right tabular-nums">
                          {studio.maxCapacity ?? "—"}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="px-4">
                          <StudioActions studio={studio} title={title} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <h2 className="text-lg font-semibold">No studios listed yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Publish your first creative space to start receiving booking
              requests from photographers, filmmakers, and audio engineers.
            </p>
            <Link
              href="/add-studio"
              className={buttonVariants({ className: "mt-4" })}
            >
              <PlusIcon />
              Add New Studio
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyStudioListedPage;
