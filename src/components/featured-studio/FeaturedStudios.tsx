import { Badge } from "../ui/badge";
import StudioCard from "../studio/StudioCard";
import { Studio } from "@/types/type";
import getFeaturedStudios from "@/data-fetch/getFeaturedStudios";

const FeaturedStudios = async () => {
  const featuredStudios: Studio[] = await getFeaturedStudios();

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
        {/* Section Heading */}
        <div className="mb-8 max-w-xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Featured Studios
          </Badge>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Discover most <span className="text-destructive">creative</span>{" "}
            spaces.
          </h2>

          <p className="mt-1 text-base leading-6 text-muted-foreground">
            Explore premium studios for photography, filmmaking, podcasting, and
            everything in between.
          </p>
        </div>

        {/* Studio Grid */}
        {featuredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <h3 className="text-lg font-semibold">No studios found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              There are no studios available at the moment. Please check back
              later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedStudios;
