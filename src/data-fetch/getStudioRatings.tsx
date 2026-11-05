import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { StudioRating } from "@/types/type";

export interface StudioRatingData {
  ratings: StudioRating[];
  viewerRating: number | null;
}

const getViewerToken = async () => {
  try {
    return await getTokenFromServer();
  } catch (error) {
    console.error("Error getting viewer token for studio ratings:", error);
    return undefined;
  }
};

const getStudioRatings = async (
  studioId: string,
): Promise<StudioRatingData> => {
  try {
    const token = await getViewerToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ratings/${encodeURIComponent(studioId)}`,
      {
        cache: "no-store",
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studio ratings");
    }

    const data = await res.json();

    return {
      ratings: Array.isArray(data?.ratings) ? data.ratings : [],
      viewerRating:
        typeof data?.viewerRating === "number" ? data.viewerRating : null,
    };
  } catch (error) {
    console.error("Error fetching studio ratings:", error);
    return { ratings: [], viewerRating: null };
  }
};

export default getStudioRatings;
