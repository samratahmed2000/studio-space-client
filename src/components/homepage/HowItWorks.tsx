import {
  ClapperboardIcon,
  ClockIcon,
  CompassIcon,
  ZapIcon,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Discover Spaces",
    description:
      "Browse photography studios, film sets, podcast rooms, and more - filtered by location, style, and budget.",
    icon: CompassIcon,
  },
  {
    title: "Select Shoot Hours",
    description:
      "Pick your date and the exact hours you need. Flexible hourly booking, with no full-day commitment.",
    icon: ClockIcon,
  },
  {
    title: "Book Instantly",
    description:
      "Confirm your booking in a few clicks with transparent pricing and real-time availability.",
    icon: ZapIcon,
  },
  {
    title: "Create & Produce",
    description:
      "Show up, get creative, and make something great. Your space is ready when you are.",
    icon: ClapperboardIcon,
  },
] as const;

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-20 border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            How it works
          </Badge>

          <h2
            id="how-it-works-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            From idea to <span className="text-destructive">shoot</span> in four
            simple steps.
          </h2>

          <p className="mt-1 max-w-xl text-base leading-6 text-muted-foreground">
            Finding and booking your next creative space is simple. Here is how
            it works, from first search to final take.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.title}
                className="group gap-0 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:ring-foreground/20"
              >
                <CardHeader className="px-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="font-heading text-3xl font-semibold text-muted-foreground/25"
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <CardTitle className="mt-5 text-lg font-semibold">
                    {step.title}
                  </CardTitle>
                  <CardDescription className="mt-2 leading-6">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
