import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2Icon, MailIcon } from "lucide-react";
import Image from "next/image";
import { Studio } from "@/types/type";

const HostInfoCard = ({ studioDetails }: { studioDetails: Studio }) => {
  const { hostName, hostEmail, hostImage } = studioDetails;
  return (
    <>
      <Card className="border-border/70 shadow-sm bg-card/60">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base sm:text-lg font-semibold tracking-tight">
              Space Host Information
            </CardTitle>
            <Badge
              variant="outline"
              className="inline-flex items-center justify-center gap-1 text-xs font-normal px-4 py-3 text-muted-foreground border-border/80 leading-none"
            >
              <CheckCircle2Icon className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Verified Host
            </Badge>
          </div>
          <CardDescription className="text-xs sm:text-sm">
            Direct contact details for this studio&apos;s manager.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative size-12 sm:size-14 shrink-0 overflow-hidden rounded-full border border-border/80 bg-muted">
                {hostImage ? (
                  <Image
                    src={hostImage}
                    alt={hostName || "Host image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-secondary text-base font-bold text-secondary-foreground">
                    {(hostName || "H").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-semibold text-foreground">
                  {hostName || "Studio Host"}
                </h3>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <MailIcon className="size-3.5 shrink-0 text-muted-foreground" />
                  <Link
                    href={`mailto:${hostEmail || "host@studiospace.com"}`}
                    className="hover:underline hover:text-foreground transition-colors"
                  >
                    {hostEmail || "host@studiospace.com"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default HostInfoCard;
