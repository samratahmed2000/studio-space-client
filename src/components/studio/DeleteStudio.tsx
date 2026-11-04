"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "../ui/toast";
import { Studio } from "@/types/type";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const deleteStudio = async (id: string) => {
  try {
    const token = await getTokenFromClient();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      return { success: false, message: "Failed to delete studio" };
    }

    const data: { deletedCount?: number } = await response.json();

    if (data.deletedCount === 0) {
      return {
        success: false,
        message: "Studio not found or already deleted.",
      };
    }

    return { success: true, message: "" };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not reach the studio API.",
    };
  }
};

const DeleteStudio = ({
  studioDetails,
  iconOnly = false,
}: {
  studioDetails: Studio;
  iconOnly?: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteStudio = async () => {
    setIsDeleting(true);

    const result = await deleteStudio(studioDetails._id);

    if (!result.success) {
      toast.add({
        type: "error",
        title: "Delete Studio Failed",
        description: result.message,
      });

      setIsDeleting(false);
      return;
    }

    toast.add({
      type: "success",
      title: "Studio Deleted",
      description: "The studio has been deleted successfully.",
    });

    setOpen(false);
    setIsDeleting(false);
    router.push("/my-listings");
    router.refresh();
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!isDeleting) {
          setOpen(value);
        }
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size={iconOnly ? "icon" : "sm"}
            aria-label={
              iconOnly ? `Delete ${studioDetails.title ?? "studio"}` : undefined
            }
            title={iconOnly ? "Delete studio" : undefined}
            className={iconOnly ? "cursor-pointer" : "h-9 gap-2 cursor-pointer"}
          >
            <Trash2Icon className={iconOnly ? "size-4" : "size-3.5"} />
            {!iconOnly && "Delete Studio"}
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>Delete this studio?</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">
              {studioDetails.title ?? "This studio"}
            </span>{" "}
            will be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteStudio}
          >
            {isDeleting ? "Deleting..." : "Delete Studio"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStudio;
