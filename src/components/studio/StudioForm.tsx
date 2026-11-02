"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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

const StudioForm = ({
  categories,
  defaultValues,
  showAmenityError,
}: StudioFormProps) => {
  const selectedCategory = getCategoryTitle(defaultValues?.category);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    defaultValues?.amenitiesList ?? [],
  );

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

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
            placeholder="1500"
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

      {/* Image URL */}
      <div className="grid gap-2">
        <Label htmlFor="imageUrl" className="text-sm font-medium">
          Studio Image URL <span className="text-destructive">*</span>
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={defaultValues?.imageUrl}
          required
          placeholder="https://example.com/image.jpg"
          className="border-border/70 focus-visible:ring-foreground/20"
        />
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
