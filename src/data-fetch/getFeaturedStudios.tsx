const getFeaturedStudios = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-studios`,
      {
        next: {
          revalidate: 60,
        },
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
