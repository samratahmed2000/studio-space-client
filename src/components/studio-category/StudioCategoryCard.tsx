import * as Icons from "lucide-react";
import { ArrowUpRightIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Category } from "@/types/type";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = (Icons[name as keyof typeof Icons] ||
    Icons.CircleHelp) as LucideIcon;

  return <Icon aria-hidden="true" className={className} />;
}

const StudioCategoryCard = ({ category }: { category: Category }) => {
  const { icon, title, description } = category;

  return (
    <Card className="group h-full gap-0 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:ring-foreground/20">
      <CardHeader className="px-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            <CategoryIcon name={icon ?? "CircleHelp"} className="size-5" />
          </div>

          <ArrowUpRightIcon
            aria-hidden="true"
            className="size-4 text-muted-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
          />
        </div>

        <CardTitle className="mt-5 text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="mt-2 line-clamp-3 leading-6">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StudioCategoryCard;
