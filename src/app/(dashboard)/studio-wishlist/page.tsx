import type { Metadata } from "next";
import StudioWishlist from "@/components/wishlist-studio/StudioWishlist";

export const metadata: Metadata = {
  title: "My Studio Wishlist | StudioSpace",
  description: "Studios you have saved for later on StudioSpace.",
};

const MyStudioWishlist = () => {
  return <StudioWishlist />;
};

export default MyStudioWishlist;
