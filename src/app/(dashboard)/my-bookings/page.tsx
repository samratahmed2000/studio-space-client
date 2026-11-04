import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDaysIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Booking } from "@/types/type";
import BookingItem from "@/components/booking/BookingItem";

export const metadata: Metadata = {
  title: "My Bookings | StudioSpace",
  description: "View and manage your studio reservations.",
};

const MyStudioBookedPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  let bookings: Booking[] = [];

  if (user?.email) {
    const token = await getTokenFromServer();

    if (token) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(user.email)}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        bookings = await response.json();
      }
    }
  }

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Reservations
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            My <span className="text-destructive">Bookings</span>
          </h1>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Track your studio reservations and booking details.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-b border-border/60 pb-4">
          <p className="text-sm text-muted-foreground">
            Total{" "}
            <span className="font-semibold text-foreground">
              {bookings.length}
            </span>{" "}
            {bookings.length === 1 ? "booking" : "bookings"}
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="mt-6 space-y-4">
            {bookings.map((booking) => (
              <BookingItem key={booking._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed p-10 text-center">
            <CalendarDaysIcon className="mx-auto size-6 text-muted-foreground" />
            <h2 className="mt-3 font-semibold">No bookings yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Studios you reserve will appear here.
            </p>
            <Link
              href="/studios"
              className={buttonVariants({ className: "mt-5" })}
            >
              Browse Studios
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyStudioBookedPage;
