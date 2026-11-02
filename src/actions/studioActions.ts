"use server";

import { revalidatePath } from "next/cache";

type StudioPayload = Record<string, unknown>;

type ActionResult = { success: true } | { success: false; message: string };

const getErrorMessage = async (res: Response, fallback: string) => {
  const errorData: { message?: string } | null = await res
    .json()
    .catch(() => null);

  return errorData?.message || fallback;
};

export async function addStudio(data: StudioPayload): Promise<ActionResult> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-studio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return {
        success: false,
        message: await getErrorMessage(res, "Failed to add studio"),
      };
    }

    revalidatePath("/");
    revalidatePath("/studios");
    revalidatePath("/my-listings");

    return { success: true };
  } catch (error) {
    console.error("Failed to add studio:", error);
    return { success: false, message: "Could not reach the studio API." };
  }
}

export async function updateStudio(
  id: string,
  data: StudioPayload,
): Promise<ActionResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: await getErrorMessage(res, "Failed to update studio"),
      };
    }

    revalidatePath("/");
    revalidatePath("/studios");
    revalidatePath("/my-listings");
    revalidatePath(`/studios/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update studio:", error);
    return { success: false, message: "Could not reach the studio API." };
  }
}

export async function deleteStudio(id: string): Promise<ActionResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      return {
        success: false,
        message: await getErrorMessage(res, "Failed to delete studio"),
      };
    }

    const data: { deletedCount?: number } | null = await res
      .json()
      .catch(() => null);

    if (data?.deletedCount === 0) {
      return {
        success: false,
        message: "Studio not found or already deleted.",
      };
    }

    revalidatePath("/");
    revalidatePath("/studios");
    revalidatePath("/my-listings");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete studio:", error);
    return { success: false, message: "Could not reach the studio API." };
  }
}
