"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import StudioForm from "./StudioForm";
import { Category } from "@/types/type";
import getCategory from "@/data-fetch/getCategoryData";
import { addStudio } from "@/actions/studioActions";

const AddStudioForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const handleAddStudio = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    const formData = new FormData(event.currentTarget);
    const studioData = Object.fromEntries(formData.entries());
    const amenitiesList = formData.getAll("amenitiesList").map(String);

    if (amenitiesList.length === 0) {
      return;
    }

    setIsLoading(true);

    const submissionData = {
      title: studioData.title,
      category: studioData.category,
      location: studioData.location,
      imageUrl: studioData.imageUrl,
      hourlyRate: Number(studioData.hourlyRate),
      securityDeposit: Number(studioData.securityDeposit),
      maxCapacity: Number(studioData.maxCapacity),
      amenitiesList,
      description: studioData.description,
    };

    try {
      const result = await addStudio(submissionData);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.add({
        title: "Success",
        description: "Studio added successfully.",
      });

      router.push("/my-listings");
    } catch (error) {
      console.error("Failed to submit studio:", error);

      toast.add({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleAddStudio}
      className="mt-10 grid gap-6 rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
    >
      <StudioForm categories={categories} showAmenityError={isSubmitted} />

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10 w-74 justify-self-center bg-foreground text-background transition-colors hover:bg-foreground/95 sm:h-11 md:h-12"
      >
        {isLoading ? "Adding New Studio..." : "Add New Studio"}
      </Button>
    </form>
  );
};

export default AddStudioForm;
