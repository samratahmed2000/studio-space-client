"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import StudioForm from "./StudioForm";
import { Category } from "@/types/type";
import getCategory from "@/data-fetch/getCategoryData";

const addStudio = async (studioData: Record<string, unknown>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-studio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      },
    );

    if (!response.ok) {
      return { success: false, message: "Failed to add studio" };
    }

    return { success: true, message: "" };
  } catch {
    return { success: false, message: "Could not reach the studio API." };
  }
};

const AddStudioForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
    const imageUrls = formData
      .getAll("imageUrls")
      .map(String)
      .map((url) => url.trim())
      .filter(Boolean);

    if (amenitiesList.length === 0) {
      return;
    }

    const primaryImageUrl =
      imageUrls[0] || String(studioData.imageUrl || "").trim();

    if (!primaryImageUrl) {
      toast.add({
        title: "Image required",
        description:
          "Please provide at least one valid image URL for your studio.",
      });
      return;
    }

    setIsLoading(true);

    const user = session?.user;
    const submissionData = {
      title: studioData.title,
      category: studioData.category,
      location: studioData.location,
      imageUrl: primaryImageUrl,
      imageUrls:
        imageUrls.length > 0 ? imageUrls : [primaryImageUrl].filter(Boolean),
      hourlyRate: Number(studioData.hourlyRate),
      securityDeposit: Number(studioData.securityDeposit),
      maxCapacity: Number(studioData.maxCapacity),
      amenitiesList,
      description: studioData.description,
      hostName: String(
        studioData.hostName || user?.name || "Studio Host",
      ).trim(),
      hostEmail: String(
        studioData.hostEmail || user?.email || "host@studiospace.com",
      ).trim(),
      hostImage: String(studioData.hostImage || user?.image || "").trim(),
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

  const user = session?.user;

  return (
    <form
      onSubmit={handleAddStudio}
      className="mt-10 grid gap-6 rounded-xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
    >
      <StudioForm
        categories={categories}
        showAmenityError={isSubmitted}
        defaultValues={{
          hostName: user?.name,
          hostEmail: user?.email,
          hostImage: user?.image || undefined,
        }}
      />

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-2 h-10 w-74 justify-self-center bg-foreground text-background transition-colors hover:bg-foreground/95 sm:h-11 md:h-12 cursor-pointer font-medium"
      >
        {isLoading ? "Adding New Studio..." : "Add New Studio"}
      </Button>
    </form>
  );
};

export default AddStudioForm;
