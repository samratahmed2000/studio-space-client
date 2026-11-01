"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Category } from "@/types/type";
import getCategory from "@/data-fetch/getCategoryData";
import { useRouter } from "next/navigation";

const AMENITIES_OPTIONS = [
  "Wi-Fi",
  "Changing Room",
  "Studio Lighting",
  "Cyclorama Wall",
  "Air Conditioning",
  "Free Parking",
  "Soundproof",
  "Makeup Station",
];

const AddStudioForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getCategory();
        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const handleAddStudio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (selectedAmenities.length === 0) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const studioData = Object.fromEntries(formData.entries());

    const submissionData = {
      title: studioData.title,
      category: selectedCategory,
      location: studioData.location,
      imageUrl: studioData.imageUrl,
      hourlyRate: Number(studioData.hourlyRate),
      securityDeposit: Number(studioData.securityDeposit),
      maxCapacity: Number(studioData.maxCapacity),
      amenitiesList: selectedAmenities,
    };

    console.log(submissionData, "submissionData");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add studio");
      }

      router.push("/studios");
    } catch (error) {
      console.error("Failed to submit studio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleAddStudio}
        className="mt-10 grid gap-6 rounded-xl border border-border/60 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Title */}
        <div className="grid gap-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Studio Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="title"
            type="text"
            name="title"
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
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              required
            >
              <SelectTrigger
                id="category"
                className="border-border/70 focus:ring-foreground/20"
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id || cat.title} value={cat.title}>
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
              type="text"
              name="location"
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
              type="number"
              required
              name="hourlyRate"
              min="0"
              step="0.01"
              placeholder="75"
              className="border-border/70 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="securityDeposit" className="text-sm font-medium">
              Security Deposit ($) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="securityDeposit"
              type="number"
              name="securityDeposit"
              required
              min="0"
              step="0.01"
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
              type="number"
              name="maxCapacity"
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
            type="url"
            name="imageUrl"
            required
            placeholder="https://example.com"
            className="border-border/70 focus-visible:ring-foreground/20"
          />
        </div>

        {/* Amenities */}
        <div className="grid gap-2">
          <Label className="text-sm font-medium">
            Amenities <span className="text-destructive">*</span>
          </Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {AMENITIES_OPTIONS.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleToggleAmenity(amenity)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all cursor-pointer select-none font-medium
                    ${
                      isSelected
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground/80 border-border/70 hover:border-foreground/40"
                    }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>

          {isSubmitted && selectedAmenities.length === 0 && (
            <p className="text-xs font-medium text-destructive mt-1">
              Please select at least one amenity.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 justify-self-center h-10 w-74 sm:h-11 md:h-12 transition-colors bg-foreground text-background hover:bg-foreground/95"
        >
          {isLoading ? "Adding New Studio..." : "Add New Studio"}
        </Button>
      </form>
    </div>
  );
};

export default AddStudioForm;
