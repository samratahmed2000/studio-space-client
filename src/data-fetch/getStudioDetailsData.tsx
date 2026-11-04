const getStudioDetailsData = async ({ id }: { id: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studio details");
    }

    const studios = await res.json();
    return studios;
  } catch (error) {
    console.error("Error fetching studio details:", error);
    throw error;
  }
};

export default getStudioDetailsData;
