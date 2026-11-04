import type { Studio } from "@/types/type";

const getStudioDetailsData = async ({
  id,
}: {
  id: string;
}): Promise<Studio | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      },
    );

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch studio details");
    }

    const body = await res.text();

    if (!body) {
      return null;
    }

    const studio: Studio = JSON.parse(body);
    return studio ?? null;
  } catch (error) {
    console.error("Error fetching studio details:", error);
    throw error;
  }
};

export default getStudioDetailsData;
