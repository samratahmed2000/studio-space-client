"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDaysIcon,
  ClockIcon,
  Loader2Icon,
  UsersIcon,
  AlertCircleIcon,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Studio } from "@/types/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/toast";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export interface BookingFormProps {
  studioDetails: Studio;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

const toMinutes = (time: string) => {
  if (!time) return 0;
  const [hours, minutes] = time.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

const getDateTime = (date: string, time: string) => {
  if (!date || !time) return null;

  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  if ([year, month, day, hours, minutes].some(Number.isNaN)) {
    return null;
  }

  const value = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return Number.isNaN(value.getTime()) ? null : value;
};

const formatPrice = (amount: number) => `$${Number(amount || 0).toFixed(2)}`;

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const BookingForm = ({
  studioDetails,
  onSuccess,
  onCancel,
  className = "",
}: BookingFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalMember, setTotalMember] = useState("1");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    _id,
    title,
    location,
    imageUrl,
    hourlyRate = 0,
    securityDeposit = 0,
    maxCapacity = 1,
  } = studioDetails;

  const memberCount = Number(totalMember);
  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const isTimeRangeValid = Boolean(
    startTime && endTime && endMinutes > startMinutes,
  );
  const duration = isTimeRangeValid ? (endMinutes - startMinutes) / 60 : 0;
  const bookingAmount = hourlyRate * duration;
  const perMemberCost = memberCount > 0 ? bookingAmount / memberCount : 0;
  const totalCost = bookingAmount + securityDeposit;
  const minDate = getToday();

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setError("");
    const user = session?.user;

    if (!user) {
      setError("Please sign in before confirming your booking.");
      router.push(`/login?redirectTo=/studios/${_id}`);
      return;
    }

    const today = getToday();

    if (!bookingDate || bookingDate < today) {
      const message = "Please select a valid booking date.";
      setError(message);
      toast.add({
        type: "error",
        title: "Invalid Booking Date",
        description: message,
      });
      return;
    }

    if (!startTime || !endTime || endMinutes <= startMinutes) {
      setError("End time must be later than start time.");
      return;
    }

    const startsAt = getDateTime(bookingDate, startTime);

    if (!startsAt || startsAt.getTime() <= Date.now()) {
      const message =
        "This time has already passed. Please choose a future time slot.";
      setError(message);
      toast.add({
        type: "error",
        title: "Booking Time Passed",
        description: message,
      });
      return;
    }

    if (
      !Number.isInteger(memberCount) ||
      memberCount < 1 ||
      memberCount > maxCapacity
    ) {
      setError(`Total members must be between 1 and ${maxCapacity}.`);
      return;
    }

    if (duration <= 0) {
      setError("Please select a valid booking duration.");
      return;
    }

    setIsLoading(true);

    try {
      const token = await getTokenFromClient();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booking`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            email: user.email,
            studioId: _id,
            studioTitle: title,
            studioLocation: location,
            studioImage: imageUrl,
            bookingDate,
            startTime,
            endTime,
            totalMember: memberCount,
            bookingDuration: duration,
            hourlyRate,
            bookingAmount,
            perMemberCost,
            securityDeposit,
            totalAmount: totalCost,
            notes: notes.trim() || undefined,
            status: "pending",
            createdAt: new Date().toISOString(),
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to complete booking.");
      }

      toast.add({
        title: "Booking Confirmed!",
        description: `Your reservation for "${title}" has been successfully scheduled.`,
      });

      if (onSuccess) {
        onSuccess();
      }

      router.push("/my-bookings");
      router.refresh();
    } catch (bookingError) {
      const errorMessage =
        bookingError instanceof Error
          ? bookingError.message
          : "Something went wrong. Please try again.";

      setError(errorMessage);
      toast.add({
        title: "Booking Failed",
        description: errorMessage,
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleBooking} className={`space-y-4 ${className}`}>
      {/* Date Field */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bookingDate" className="cursor-pointer">
            <CalendarDaysIcon className="size-4 text-muted-foreground" />
            Date
          </Label>
          {bookingDate && (
            <span className="text-xs font-medium text-muted-foreground">
              {formatDisplayDate(bookingDate)}
            </span>
          )}
        </div>
        <Input
          id="bookingDate"
          type="date"
          min={minDate}
          value={bookingDate}
          onChange={(event) => setBookingDate(event.target.value)}
          required
          disabled={isLoading}
          className="cursor-pointer"
        />
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-2">
          <Label htmlFor="startTime" className="cursor-pointer">
            <ClockIcon className="size-4 text-muted-foreground" />
            Start Time
          </Label>
          <Input
            id="startTime"
            type="time"
            value={startTime}
            onChange={(event) => setStartTime(event.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endTime" className="cursor-pointer">
            <ClockIcon className="size-4 text-muted-foreground" />
            End Time
          </Label>
          <Input
            id="endTime"
            type="time"
            min={startTime || undefined}
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Duration hint */}
      {startTime && endTime && (
        <div className="flex items-center justify-between text-xs">
          {isTimeRangeValid ? (
            <span className="text-muted-foreground flex items-center gap-1">
              Estimated Duration:
              <Badge variant="secondary" className="font-semibold text-xs ml-1">
                {Number(duration.toFixed(2))}{" "}
                {duration === 1 ? "hour" : "hours"}
              </Badge>
            </span>
          ) : (
            <span className="text-destructive font-medium">
              End time must be later than start time
            </span>
          )}
        </div>
      )}

      {/* Guest count */}
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="totalMember" className="cursor-pointer">
            <UsersIcon className="size-4 text-muted-foreground" />
            Total Attendees
          </Label>
          <span className="text-xs text-muted-foreground">
            Max capacity: {maxCapacity}{" "}
            {maxCapacity === 1 ? "person" : "people"}
          </span>
        </div>
        <Input
          id="totalMember"
          type="number"
          min={1}
          max={maxCapacity}
          step={1}
          value={totalMember}
          onChange={(event) => setTotalMember(event.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Optional notes / shoot purpose */}
      <div className="grid gap-2">
        <Label
          htmlFor="notes"
          className="text-xs text-muted-foreground font-normal"
        >
          Special Requests / Equipment (Optional)
        </Label>
        <Textarea
          id="notes"
          rows={2}
          placeholder="E.g., Bringing lighting gear, need backdrop stand setup, etc."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          disabled={isLoading}
          className="text-xs resize-none"
        />
      </div>

      {/* Pricing Summary Card */}
      <div className="rounded-lg border border-border/70 bg-muted/20 p-3.5 space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Price Breakdown
          </span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(hourlyRate)}/hr
          </span>
        </div>

        {duration > 0 ? (
          <>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">
                {Number(duration.toFixed(2))} hr{duration === 1 ? "" : "s"} ×{" "}
                {formatPrice(hourlyRate)}
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(bookingAmount)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span>Security Deposit</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  (Refundable)
                </span>
              </div>
              <span className="font-medium text-foreground">
                {formatPrice(securityDeposit)}
              </span>
            </div>

            {memberCount > 1 && (
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-0.5">
                <span>Split cost ({memberCount} attendees)</span>
                <span>≈ {formatPrice(perMemberCost)} / person</span>
              </div>
            )}

            <Separator className="my-1" />

            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="text-sm font-semibold text-foreground">
                  Total Amount
                </span>
                <p className="text-xs text-muted-foreground">
                  Includes all fees & deposit
                </p>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                {formatPrice(totalCost)}
              </span>
            </div>
          </>
        ) : (
          <div className="py-2 text-center text-xs text-muted-foreground">
            Select a date and valid time slot above to see the cost breakdown.
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon className="size-4 shrink-0" />
          <AlertTitle className="text-sm font-medium">Booking Error</AlertTitle>
          <AlertDescription className="text-xs mt-0.5">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-2">
        {onCancel && (
          <Button
            type="button"
            size="lg"
            variant="outline"
            disabled={isLoading}
            onClick={onCancel}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={isLoading || duration <= 0}
          className="w-full sm:w-auto font-medium cursor-pointer"
        >
          {isLoading && <Loader2Icon className="mr-2 size-4 animate-spin" />}
          {isLoading ? "Confirming Booking..." : "Book Workspace"}
        </Button>
      </div>
    </form>
  );
};

export { BookingForm };
export default BookingForm;
