import { Badge } from "@/components/ui/badge";
import AddStudioForm from "@/components/studio/AddStudioForm";

const AddNewStudioPage = () => {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-xl">
        <Badge
          variant="outline"
          className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-destructive"
          />
          Onboard Studio
        </Badge>

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          List a New <span className="text-destructive">Studio</span> Space
        </h2>

        <p className="mt-1 text-base leading-7 text-muted-foreground">
          Earn revenue by sharing your creative spaces.
        </p>
      </div>

      <AddStudioForm />
    </main>
  );
};

export default AddNewStudioPage;
