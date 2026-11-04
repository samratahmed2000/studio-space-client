import { authClient } from "./auth-client";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error(error?.message || "Could not get authentication token.");
  }

  return data.token;
};
