"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "cn";
import { useSession } from "@/lib/auth-client";
import { useWishlist } from "@/hooks/use-wishlist";
import { Studio } from "@/types/type";
import { toast } from "@/components/ui/toast";

interface WishlistButtonProps {
  studio: Studio;
  className?: string;
}

const WishlistButton = ({ studio, className }: WishlistButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending: isSessionPending } = useSession();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isUpdating, setIsUpdating] = useState(false);

  const saved = isWishlisted(studio._id);
  const title = studio.title ?? "Studio";

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isUpdating || isSessionPending) return;

    if (!session?.user) {
      toast.add({
        type: "error",
        title: "Sign in required",
        description: "Please sign in to save studios to your wishlist.",
      });
      router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsUpdating(true);

    try {
      const added = await toggleWishlist(studio);

      toast.add({
        type: "success",
        title: added ? "Saved to Wishlist" : "Removed from Wishlist",
        description: added
          ? `"${title}" has been added to your wishlist.`
          : `"${title}" has been removed from your wishlist.`,
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Wishlist Update Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isUpdating}
      aria-busy={isUpdating}
      aria-label={
        saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`
      }
      aria-pressed={saved}
      title={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={cn(
        "inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-background hover:text-destructive focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-80",
        saved && "text-destructive",
        className,
      )}
    >
      {isUpdating ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Heart className={cn("size-4", saved && "fill-current")} />
      )}
    </button>
  );
};

export { WishlistButton };
export default WishlistButton;
