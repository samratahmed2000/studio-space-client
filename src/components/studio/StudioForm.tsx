"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusIcon, Trash2Icon, ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Category, Studio } from "@/types/type";
import { AMENITIES_OPTIONS } from "@/lib/amenities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "@/lib/auth-client";

interface StudioFormProps {
  categories: Category[];
  defaultValues?: Partial<Studio>;
  showAmenityError?: boolean;
}

const getCategoryTitle = (category: Studio["category"]) => {
  if (typeof category === "string") {
    return category;
  }

  return category?.[0]?.title ?? "";
};

const getInitialImages = (defaultValues?: Partial<Studio>): string[] => {
  if (
    Array.isArray(defaultValues?.imageUrls) &&
    defaultValues.imageUrls.length > 0
  ) {
    return defaultValues.imageUrls.filter(Boolean);
  }
  if (defaultValues?.imageUrl) {
    return [defaultValues.imageUrl];
  }
  return [""];
};

const StudioForm = ({
  categories,
  defaultValues,
  showAmenityError,
}: StudioFormProps) => {
  const selectedCategory = getCategoryTitle(defaultValues?.category);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    defaultValues?.amenitiesList ?? [],
  );

  const [imageUrls, setImageUrls] = useState<string[]>(() =>
    getInitialImages(defaultValues),
  );

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const handleImageUrlChange = (index: number, value: string) => {
    setImageUrls((current) => {
      const updated = [...current];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddImageUrl = () => {
    setImageUrls((current) => [...current, ""]);
  };

  const handleRemoveImageUrl = (indexToRemove: number) => {
    setImageUrls((current) => {
      if (current.length <= 1) return [""];
      return current.filter((_, idx) => idx !== indexToRemove);
    });
  };

  const primaryImage = imageUrls.find((url) => Boolean(url.trim())) || "";

  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="grid gap-6">
      {/* Studio Title */}
      <div className="grid gap-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Studio Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          defaultValue={defaultValues?.title}
          required
          placeholder="e.g., Downtown Daylight Photo Studio"
          className="border-border/70 focus-visible:ring-foreground/20"
        />
      </div>

      {/* Category & Location */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            name="category"
            defaultValue={selectedCategory || null}
            required
          >
            <SelectTrigger
              id="category"
              className="w-full border-border/70 focus:ring-foreground/20"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat._id || cat.title} value={cat.title || ""}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location" className="text-sm font-medium">
            Location <span className="text-destructive">*</span>
          </Label>
          <Input
            id="location"
            name="location"
            defaultValue={defaultValues?.location}
            required
            placeholder="e.g., Brooklyn, NY"
            className="border-border/70 focus-visible:ring-foreground/20"
          />
        </div>
      </div>

      {/* Pricing & Capacity */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="hourlyRate" className="text-sm font-medium">
            Hourly Rate ($) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            defaultValue={defaultValues?.hourlyRate ?? ""}
            required
            min="0"
            placeholder="150"
            className="border-border/70 focus-visible:ring-foreground/20"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="securityDeposit" className="text-sm font-medium">
            Security Deposit ($) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="securityDeposit"
            name="securityDeposit"
            type="number"
            defaultValue={defaultValues?.securityDeposit ?? ""}
            required
            min="0"
            placeholder="200"
            className="border-border/70 focus-visible:ring-foreground/20"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="maxCapacity" className="text-sm font-medium">
            Max Capacity (People) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            defaultValue={defaultValues?.maxCapacity ?? ""}
            required
            min="1"
            step="1"
            placeholder="15"
            className="border-border/70 focus-visible:ring-foreground/20"
          />
        </div>
      </div>

      {/* Multiple Image URLs */}
      <div className="grid gap-3 rounded-xl border border-border/70 p-4 bg-muted/15">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Label className="text-sm font-medium text-foreground">
              Studio Image URLs <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground">
              Upload multiple high-resolution photos.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddImageUrl}
            className="gap-1.5 cursor-pointer self-start sm:self-auto font-medium"
          >
            <PlusIcon className="size-3.5" />
            Add Another URL
          </Button>
        </div>

        {/* Hidden primary image for backward compatibility */}
        <input type="hidden" name="imageUrl" value={primaryImage} />

        <div className="space-y-3 pt-1">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-2">
                {url.trim() ? (
                  <div className="relative size-8 shrink-0 overflow-hidden rounded border border-border/80 bg-muted">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded border border-border/60 bg-muted/50 text-muted-foreground">
                    <ImageIcon className="size-3.5 opacity-50" />
                  </div>
                )}
              </div>

              <div className="flex flex-1 items-center gap-2">
                <Input
                  name="imageUrls"
                  type="url"
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  required={index === 0}
                  placeholder={
                    index === 0
                      ? "https://example.com/primary-cover.jpg"
                      : "https://example.com/gallery-photo.jpg"
                  }
                  className="border-border/70 focus-visible:ring-foreground/20"
                />

                {imageUrls.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemoveImageUrl(index)}
                    aria-label={`Remove photo ${index + 1}`}
                    title="Remove this photo URL"
                    className="shrink-0 text-muted-foreground hover:text-destructive cursor-pointer"
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={defaultValues?.description}
          required
          placeholder="Enter a brief description of the studio..."
          className="border-border/70 focus-visible:ring-foreground/20"
        />
      </div>

      {/* Host Information */}
      <div className="grid gap-4 rounded-xl border border-border/70 p-4 bg-muted/15">
        <div>
          <Label className="text-sm font-semibold text-foreground">
            Host Information
          </Label>
          <p className="text-xs text-muted-foreground">
            Information about the space host or manager shown on the studio
            details page.
          </p>
        </div>

        <div className="flex justify-between items-start lg:items-center gap-4 flex-col lg:flex-row">
          <p className="text-sm font-semibold text-foreground">
            Host Name:{" "}
            <span className="text-xs text-muted-foreground">{user?.name}</span>
          </p>
          <p className="text-sm font-semibold text-foreground">
            Host Email:{" "}
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </p>
        </div>
      </div>

      {/* Amenities */}
      <div className="grid gap-2">
        <Label className="text-sm font-medium">
          Amenities <span className="text-destructive">*</span>
        </Label>
        <div className="mt-1 flex flex-wrap gap-2">
          {AMENITIES_OPTIONS.map((amenity) => (
            <label key={amenity} className="cursor-pointer select-none">
              <input
                type="checkbox"
                name="amenitiesList"
                value={amenity}
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:border-foreground/40 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                {amenity}
              </span>
            </label>
          ))}
        </div>

        {showAmenityError && selectedAmenities.length === 0 && (
          <p className="mt-1 text-xs font-medium text-destructive">
            Please select at least one amenity.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudioForm;
