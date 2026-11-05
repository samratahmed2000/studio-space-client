import type { Category } from "@/types/type";

export const getCategoryHref = (category: Category) => {
  const categoryName = category.title ?? category.slug ?? "";

  return categoryName
    ? `/studios?search=${encodeURIComponent(categoryName)}`
    : "/studios";
};
