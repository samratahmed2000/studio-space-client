"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  Loader2Icon,
  MapPinIcon,
  Trash2Icon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types/type";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; badgeClassName: string }
> = {
  pending: {
    label: "Pending",
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    badgeClassName:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  completed: {
    label: "Completed",
    badgeClassName:
      "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400",
  },
  cancelled: {
    label: "Cancelled",
    badgeClassName: "border-border bg-muted text-muted-foreground",
  },
};

const normalizeStatus = (status?: string): BookingStatus => {
  const value = (status ?? "pending").trim().toLowerCase();

  if (value === "canceled") return "cancelled";
  if (value === "confirmed" || value === "completed" || value === "cancelled") {
    return value;
  }

  return "pending";
};

const getBookingEnd = (booking: Booking) => {
  if (!booking.bookingDate || !booking.endTime) return null;

  const [year, month, day] = booking.bookingDate.split("-").map(Number);
  const [hours, minutes] = booking.endTime.split(":").map(Number);

  if ([year, month, day, hours, minutes].some(Number.isNaN)) {
    return null;
  }

  const end = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return Number.isNaN(end.getTime()) ? null : end;
};

const resolveStatus = (booking: Booking): BookingStatus => {
  const storedStatus = normalizeStatus(booking.status);

  // Cancelled or already-completed bookings keep their stored state.
  if (storedStatus === "cancelled" || storedStatus === "completed") {
    return storedStatus;
  }

  const endsAt = getBookingEnd(booking);

  // Once the booked slot has ended, the reservation is effectively completed.
  if (endsAt && endsAt.getTime() < Date.now()) {
    return "completed";
  }

  return storedStatus;
};

const formatCurrency = (amount?: number) =>
  amount == null
    ? "—"
    : `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

const formatDate = (date?: string) => {
  if (!date) return "Date not set";
  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
};

const BookingItem = ({ booking }: { booking: Booking }) => {
  const router = useRouter();
  const title = booking.studioTitle ?? "Untitled studio";
  const [open, setOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [status, setStatus] = useState<BookingStatus>(() =>
    resolveStatus(booking),
  );
  const statusConfig = STATUS_CONFIG[status];
  const isCancelled = status === "cancelled";
  const canCancel = status === "pending";

  const handleRemoveBooking = async () => {
    if (isRemoving) return;

    setIsRemoving(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      const result: { deletedCount?: number; message?: string } =
        await response.json();

      if (!response.ok || result.deletedCount === 0) {
        throw new Error(result.message || "Unable to remove this booking.");
      }

      setIsRemoved(true);
      toast.add({
        type: "success",
        title: "Booking Removed",
        description: `The cancelled reservation for "${title}" has been removed.`,
      });
      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Remove Booking Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
      setIsRemoving(false);
    }
  };

  const handleCancelBooking = async () => {
    setIsCancelling(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "cancelled" }),
        },
      );
      const result = await response.json();

      if (!response.ok || result.matchedCount === 0) {
        throw new Error(result.message || "Unable to cancel this booking.");
      }

      setStatus("cancelled");
      toast.add({
        type: "success",
        title: "Booking Cancelled",
        description: `Your reservation for "${title}" has been cancelled.`,
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.add({
        type: "error",
        title: "Booking Cancellation Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  if (isRemoved) {
    return null;
  }

  return (
    <Card className="w-full py-0">
      <CardContent className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-48">
          {booking.studioImage ? (
            <Image
              src={booking.studioImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex gap-3 items-center">
                <h2 className="text-xl font-semibold tracking-tight">
                  {title}
                </h2>
                <Badge
                  variant="outline"
                  className={`text-xs ${statusConfig.badgeClassName}`}
                >
                  {statusConfig.label}
                </Badge>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPinIcon className="size-4 shrink-0" />
                <span className="line-clamp-1">
                  {booking.studioLocation || "Location not set"}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDaysIcon className="size-4 shrink-0" />
              <span>{formatDate(booking.bookingDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <ClockIcon className="size-4 shrink-0" />
              <span>
                {booking.startTime || "—"} - {booking.endTime || "—"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <UsersIcon className="size-4 shrink-0" />
              <span>{booking.totalMember ?? 1} members</span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t pt-4 sm:w-36 sm:flex-col sm:border-t-0 sm:border-l sm:py-2 sm:pl-5 sm:pt-2">
          <div className="sm:text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-semibold">
              {formatCurrency(booking.totalAmount)}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {booking.studioId && (
              <Link
                href={`/studios/${booking.studioId}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5",
                })}
              >
                View
                <ArrowUpRightIcon />
              </Link>
            )}

            {isCancelled && (
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={handleRemoveBooking}
                disabled={isRemoving}
                aria-label={`Remove cancelled booking for ${title}`}
                title="Remove booking"
                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              >
                {isRemoving ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <XIcon className="size-3.5" />
                )}
              </Button>
            )}

            {canCancel && (
              <AlertDialog
                open={open}
                onOpenChange={(value) => {
                  if (!isCancelling) setOpen(value);
                }}
              >
                <AlertDialogTrigger
                  render={
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  }
                />
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive">
                      <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Cancel this booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your pending reservation for{" "}
                      <span className="font-medium text-foreground">
                        {title}
                      </span>{" "}
                      will be marked as cancelled.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isCancelling}>
                      Keep Booking
                    </AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      disabled={isCancelling}
                      onClick={handleCancelBooking}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
