export const DEFAULT_REDIRECT = "/";

export const REDIRECT_COOKIE = "studio-space-redirect";

export const getSafeRedirectPath = (
  value: string | string[] | undefined,
  fallback: string = DEFAULT_REDIRECT,
) => {
  const path = Array.isArray(value) ? value[0] : value;

  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("\\")
  ) {
    return fallback;
  }

  return path;
};

export const withRedirectTo = (pathname: string, redirectTo?: string) => {
  if (!redirectTo || redirectTo === DEFAULT_REDIRECT) {
    return pathname;
  }

  return `${pathname}?${new URLSearchParams({ redirectTo }).toString()}`;
};
