"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  Trash2Icon,
  UsersIcon,
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
  const [status, setStatus] = useState(booking.status ?? "pending");
  const isCancelled =
    status.toLowerCase() === "cancelled" || status.toLowerCase() === "canceled";

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
                  variant={isCancelled ? "outline" : "destructive"}
                  className={`text-xs ${isCancelled ? "text-green-600 border-green-600 hover:bg-green-50" : ""}`}
                >
                  {isCancelled ? "Cancelled" : "Pending"}
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
            {!isCancelled && (
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
