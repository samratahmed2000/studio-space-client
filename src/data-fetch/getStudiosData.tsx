type GetStudiosOptions = {
  /** Skip the 60s data cache and always read the latest studios. */
  fresh?: boolean;
};

const getStudiosData = async ({ fresh = false }: GetStudiosOptions = {}) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/studios`;

    const res = fresh
      ? await fetch(url, { cache: "no-store" })
      : await fetch(url, {
          next: {
            revalidate: 60,
          },
        });

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
