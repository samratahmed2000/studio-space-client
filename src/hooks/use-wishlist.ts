"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { useSession } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Studio } from "@/types/type";

type WishlistStatus = "idle" | "loading" | "ready" | "error";

interface WishlistState {
  studios: Studio[];
  status: WishlistStatus;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SERVER_STATE: WishlistState = { studios: [], status: "idle" };

let state: WishlistState = SERVER_STATE;
let loadPromise: Promise<void> | null = null;

const listeners = new Set<() => void>();

const emit = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

const getErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data: { message?: string } = await response.json();
    return typeof data.message === "string" ? data.message : fallback;
  } catch {
    return fallback;
  }
};

export const loadWishlist = (force = false) => {
  if (!force && (state.status === "ready" || state.status === "loading")) {
    return loadPromise ?? Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  state = { ...state, status: "loading" };
  emit();

  loadPromise = (async () => {
    try {
      const token = await getTokenFromClient();

      const response = await fetch(`${API_URL}/studio-wishlist`, {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Could not load your wishlist."),
        );
      }

      const studios: unknown = await response.json();

      state = {
        studios: Array.isArray(studios) ? (studios as Studio[]) : [],
        status: "ready",
      };
    } catch {
      state = { ...state, status: "error" };
    } finally {
      emit();
      loadPromise = null;
    }
  })();

  return loadPromise;
};

export const toggleWishlist = async (studio: Studio) => {
  await loadWishlist();

  const exists = state.studios.some((item) => item._id === studio._id);
  const previousStudios = state.studios;

  state = {
    ...state,
    studios: exists
      ? previousStudios.filter((item) => item._id !== studio._id)
      : [studio, ...previousStudios],
  };
  emit();

  try {
    const token = await getTokenFromClient();

    if (exists) {
      const response = await fetch(
        `${API_URL}/studio-wishlist/${studio._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Could not remove this studio."),
        );
      }
    } else {
      const response = await fetch(`${API_URL}/studio-wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studioId: studio._id }),
      });

      if (!response.ok) {
        throw new Error(
          await getErrorMessage(response, "Could not save this studio."),
        );
      }

      const result: { studio?: Studio } = await response.json();

      if (result.studio) {
        state = {
          ...state,
          studios: [
            result.studio,
            ...state.studios.filter((item) => item._id !== studio._id),
          ],
        };
        emit();
      }
    }

    return !exists;
  } catch (error) {
    state = { ...state, studios: previousStudios };
    emit();
    throw error;
  }
};

export const useWishlist = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { studios, status } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (userId) {
      void loadWishlist();
    }
  }, [userId]);

  const isWishlisted = useCallback(
    (id: string) => studios.some((studio) => studio._id === id),
    [studios],
  );

  return {
    studios,
    status,
    isWishlisted,
    toggleWishlist,
    loadWishlist,
  };
};
