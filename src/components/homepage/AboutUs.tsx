import {
  BadgeCheckIcon,
  HeadsetIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const assurances = [
  {
    title: "Liability Protection",
    description:
      "Every eligible booking is covered against on-set incidents, so hosts and creators can work without second-guessing.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Verified Profiles",
    description:
      "Hosts and creators complete identity and profile checks before their first listing or booking goes live.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Equipment Safety",
    description:
      "Secure spaces, clear gear policies, and a simple damage-reporting flow built into every reservation.",
    icon: PackageCheckIcon,
  },
  {
    title: "24/7 Host Support",
    description:
      "Real people on call around the clock for access issues, last-minute changes, or questions mid-shoot.",
    icon: HeadsetIcon,
  },
] as const;

const AboutUs = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-b border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col">
          {/* <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16"> */}
          <div className="max-w-xl">
            <Badge
              variant="outline"
              className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-destructive"
              />
              About Us
            </Badge>

            <h2
              id="about-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Host Guarantee &amp;{" "}
              <span className="text-destructive">Creator</span> Support
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Book confidently with verified hosts, equipment protection, and
              24/7 dedicated support.
            </p>

            <Separator className="mt-8" />
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {assurances.map((assurance) => {
                const Icon = assurance.icon;

                return (
                  <Card
                    key={assurance.title}
                    className="group gap-0 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:ring-foreground/20"
                  >
                    <CardHeader className="px-0">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                        <Icon aria-hidden="true" className="size-5" />
                      </div>

                      <CardTitle className="mt-5 text-lg font-semibold">
                        {assurance.title}
                      </CardTitle>
                      <CardDescription className="mt-2 leading-6">
                        {assurance.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
