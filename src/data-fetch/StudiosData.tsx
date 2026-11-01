const getStudiosData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    const studios = await res.json();
    return studios;
  } catch (error) {
    console.error("Error fetching studios:", error);
    throw error;
  }
};

export default getStudiosData;
