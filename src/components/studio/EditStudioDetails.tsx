"use client";

import { useEffect, useState } from "react";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "../ui/toast";
import StudioForm from "./StudioForm";
import { Category, Studio } from "@/types/type";
import getCategory from "@/data-fetch/getCategoryData";
import { updateStudio } from "@/actions/studioActions";

interface EditStudioDetailsProps {
  studioDetails: Studio;
}

const EditStudioDetails = ({ studioDetails }: EditStudioDetailsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
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

  // Update studio
  const handleEditStudioDetails = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitted(true);

    const formData = new FormData(event.currentTarget);
    const studioData = Object.fromEntries(formData.entries());
    const amenitiesList = formData.getAll("amenitiesList").map(String);

    if (amenitiesList.length === 0) {
      return;
    }

    setIsLoading(true);

    const updatedData = {
      ...studioData,
      hourlyRate: Number(studioData.hourlyRate),
      securityDeposit: Number(studioData.securityDeposit),
      maxCapacity: Number(studioData.maxCapacity),
      amenitiesList,
    };

    try {
      const result = await updateStudio(studioDetails._id, updatedData);

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.add({
        title: "Success",
        description: "Studio details updated successfully.",
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update studio:", error);

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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);

        if (value) {
          setIsSubmitted(false);
        }
      }}
    >
      <DialogTrigger
        render={
          <Button variant="outline" size="lg" className="gap-2">
            <EditIcon className="size-4" />
            Edit Studio
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Studio Details</DialogTitle>
          <DialogDescription>
            Update your studio information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleEditStudioDetails} className="grid gap-6 pt-3">
          <StudioForm
            categories={categories}
            defaultValues={studioDetails}
            showAmenityError={isSubmitted}
          />

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-foreground text-background hover:bg-foreground/95"
            >
              {isLoading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStudioDetails;
