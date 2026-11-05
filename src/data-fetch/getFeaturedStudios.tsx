import { getTokenFromServer } from "@/lib/getTokenFromServer";

const getViewerToken = async () => {
  try {
    return await getTokenFromServer();
  } catch (error) {
    console.error("Error getting viewer token for featured studios:", error);
    return undefined;
  }
};

const getFeaturedStudios = async () => {
  try {
    const token = await getViewerToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-studios`,
      {
        cache: "no-store",
        headers: token ? { authorization: `Bearer ${token}` } : undefined,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch featured-studios");
    }

    const featuredStudios = await res.json();
    return featuredStudios;
  } catch (error) {
    console.error("Error fetching featured-studios:", error);
    throw error;
  }
};

export default getFeaturedStudios;
