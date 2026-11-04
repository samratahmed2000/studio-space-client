import type { Studio } from "@/types/type";

const getMyStudiosData = async (token: string): Promise<Studio[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-studios`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch your studios");
    }

    const studios: unknown = await res.json();
    return Array.isArray(studios) ? (studios as Studio[]) : [];
  } catch (error) {
    console.error("Error fetching your studios:", error);
    return [];
  }
};

export default getMyStudiosData;
