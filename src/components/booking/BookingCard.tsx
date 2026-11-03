"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarIcon,
  UsersIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SparklesIcon,
  InfoIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Studio } from "@/types/type";
import { MyBookingCard } from "./MyBookingCard";

interface BookingCardProps {
  studioDetails: Studio;
  className?: string;
  defaultOpen?: boolean;
}

const BookingCard = ({
  studioDetails,
  className,
  defaultOpen = false,
}: BookingCardProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(defaultOpen);

  const {
    _id,
    title = "Studio Workspace",
    hourlyRate = 0,
    securityDeposit = 0,
    maxCapacity,
  } = studioDetails;

  const handleBookingClick = () => {
    if (!session?.user) {
      router.push(`/login?redirectTo=/studios/${_id}`);
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <Card
        className={`sticky top-24 border-border/70 shadow-sm ${className ?? ""}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                ${hourlyRate}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                / hour
              </span>
            </div>

            <Badge variant="secondary" className="gap-1 font-normal text-xs">
              <SparklesIcon className="size-3 text-amber-500 fill-amber-500" />
              Instant Book
            </Badge>
          </div>

          <CardDescription className="mt-1 text-xs sm:text-sm">
            Flexible hourly booking with no full-day commitment.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4 pt-4">
          {/* Capacity & Deposit info */}
          <div className="rounded-lg border border-border/70 p-3.5 bg-muted/20 space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 text-foreground/90 font-medium">
                <UsersIcon className="size-4 text-muted-foreground shrink-0" />
                <span>Capacity</span>
              </div>
              <span className="text-muted-foreground font-normal">
                Up to {maxCapacity ?? "—"} people
              </span>
            </div>

            <Separator className="opacity-50" />

            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2.5 text-foreground/90 font-medium">
                <ShieldAlertIcon className="size-4 text-muted-foreground shrink-0" />
                <span>Security Deposit</span>
              </div>
              <span className="text-muted-foreground font-normal">
                ${securityDeposit}{" "}
                <span className="text-xs text-muted-foreground/80">
                  (Refundable)
                </span>
              </span>
            </div>
          </div>

          {/* Pricing notice */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-dashed border-border/70 flex items-start gap-2">
            <InfoIcon className="size-3.5 shrink-0 mt-0.5 text-muted-foreground" />
            <span>
              Charges are based on exact booked shoot hours. Real-time
              availability verified at checkout.
            </span>
          </div>

          {/* Studio Peace-of-mind perks */}
          <div className="space-y-2 pt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Free cancellation up to 24h prior to reservation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Direct host communication upon booking confirmation</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2.5 pt-2">
          <Button
            className="w-full font-medium cursor-pointer"
            size="lg"
            onClick={handleBookingClick}
          >
            <CalendarIcon className="mr-2 size-4" /> Book Workspace
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheckIcon className="size-3.5 text-muted-foreground" />
            <span>No payment charged until reservation is confirmed</span>
          </div>
        </CardFooter>
      </Card>

      {/* Reservation Dialog Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs font-normal">
                Reservation
              </Badge>
            </div>
            <DialogTitle className="text-xl">Reserve {title}</DialogTitle>
            <DialogDescription>
              Select your preferred date, shoot hours, and guest details below.
            </DialogDescription>
          </DialogHeader>

          <MyBookingCard
            studioDetails={studioDetails}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export { BookingCard };
export default BookingCard;
