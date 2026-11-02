import { CalendarIcon, UsersIcon, ShieldAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Studio } from "@/types/type";

interface BookingCardProps {
  studioDetails: Studio;
}

export const BookingCard = ({ studioDetails }: BookingCardProps) => {
  const { hourlyRate = 0, securityDeposit = 0, maxCapacity } = studioDetails;

  return (
    <Card className="sticky top-24 border-border/60 shadow-sm">
      <CardHeader>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">${hourlyRate.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">/ hour</span>
        </div>
        <CardDescription className="mt-1">
          Flexible hourly booking with no full-day commitment.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-lg border border-border/70 p-3 bg-muted/10 space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <UsersIcon className="size-4 text-muted-foreground shrink-0" />
            <span className="text-foreground/90">
              Up to {maxCapacity ?? "—"} people max
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <ShieldAlertIcon className="size-4 text-muted-foreground shrink-0" />
            <span className="text-foreground/90">
              Security Deposit: ${securityDeposit.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/30 p-2.5 rounded border border-dashed border-border/60">
          Charges are based on exact booked shoot hours. Real-time availability
          verified at checkout.
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full font-medium cursor-pointer" size="lg">
          <CalendarIcon className="mr-2 size-4" /> Book Workspace
        </Button>
      </CardFooter>
    </Card>
  );
};
