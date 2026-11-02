import StudioCard from "@/components/studio/StudioCard";
import StudioSearch from "@/components/studio/StudioSearch";
import { Badge } from "@/components/ui/badge";
import getStudiosData from "@/data-fetch/getStudiosData";
import { Studio } from "@/types/type";

const getCategoryText = (category: Studio["category"]) => {
  if (Array.isArray(category)) {
    return category
      .map((item) => [item.title, item.slug].filter(Boolean).join(" "))
      .join(" ");
  }

  return category ?? "";
};

const matchesSearch = (studio: Studio, query: string) => {
  const searchableText = [
    studio.title,
    studio.location,
    studio.description,
    getCategoryText(studio.category),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
};

const AllStudiosPage = async ({ searchParams }: PageProps<"/studios">) => {
  const { search } = await searchParams;
  const query = typeof search === "string" ? search.trim() : "";

  const studios: Studio[] = await getStudiosData();
  const filteredStudios = query
    ? studios.filter((studio) => matchesSearch(studio, query))
    : studios;

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-6 max-w-2xl">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Creative Spaces
          </Badge>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Find your perfect creative space.
          </h1>

          <p className="mt-1 text-muted-foreground leading-6">
            Discover inspiring spaces for photography, filmmaking, podcasting,
            and everything in between.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-end">
          <div className="w-full max-w-xl">
            <StudioSearch key={query} defaultValue={query} />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <p className="text-sm text-muted-foreground">
            {query ? (
              <>
                <span className="font-semibold text-foreground">
                  {filteredStudios.length}
                </span>{" "}
                {filteredStudios.length === 1 ? "studio" : "studios"} found for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : (
              <>
                Total{" "}
                <span className="font-semibold text-foreground">
                  {studios.length}
                </span>{" "}
                studios
              </>
            )}
          </p>
        </div>

        {/* Studio Grid */}
        {filteredStudios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center">
            <h2 className="text-lg font-semibold">No studios found</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {query
                ? `We couldn't find any studios matching “${query}”. Try a different search.`
                : "There are no studios available at the moment. Please check back later."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default AllStudiosPage;
