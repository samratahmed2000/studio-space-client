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
import { deleteStudio } from "@/actions/studioActions";

const DeleteStudio = ({ studioDetails }: { studioDetails: Studio }) => {
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
    router.push("/studios");
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
            size="sm"
            className="h-9 gap-2 cursor-pointer"
          >
            <Trash2Icon className="size-3.5" />
            Delete Studio
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
