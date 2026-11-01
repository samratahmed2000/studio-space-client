import { Category } from "@/types/type";

const getCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const categories: Category[] = await res.json();
  return categories;
};

export default getCategory;
