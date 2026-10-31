import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types/type";
import StudioCategoryCard from "./StudioCategoryCard";

const StudioCategories = async () => {
  const res = await fetch(`http://localhost:8000/categories`);
  const categories: Category[] = await res.json();

  return (
    <section
      aria-labelledby="studio-categories-heading"
      className="pt-12 sm:pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-destructive"
              />
              Studio Category
            </Badge>

            <h2
              id="studio-categories-heading"
              className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Browse Your <span className="text-destructive">Workspace</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              From photo studios to sound stages, find the right setting for
              your next shoot - every space is bookable by the hour.
            </p>
          </div>

          <Link
            href="/studios"
            className={cn(
              buttonVariants({ size: "lg" }),
              "group h-11 w-full shrink-0 gap-2 px-5 sm:w-auto",
            )}
          >
            Host Your Space
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              href={category._id}
              key={category._id}
              className="block rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <StudioCategoryCard category={category} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioCategories;
