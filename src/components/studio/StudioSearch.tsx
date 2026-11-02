"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type StudioSearchProps = {
  defaultValue?: string;
};

const StudioSearch = ({ defaultValue = "" }: StudioSearchProps) => {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const submitSearch = (nextValue: string) => {
    const query = nextValue.trim();

    router.push(
      query ? `/studios?search=${encodeURIComponent(query)}` : "/studios",
    );
  };

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch(value);
      }}
      className="flex w-full items-center gap-2"
    >
      <div className="relative flex-1">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          name="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search studios, categories, or locations..."
          aria-label="Search studios"
          className="h-11 border-border/70 pr-10 pl-9 focus-visible:ring-foreground/20"
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue("");
              submitSearch("");
            }}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <Button type="submit" size="lg" className="h-11 px-5">
        Search
      </Button>
    </form>
  );
};

export default StudioSearch;
