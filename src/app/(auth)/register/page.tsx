import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Badge } from "@/components/ui/badge";
import RegisterForm from "@/components/auth/RegisterForm";
import { getSafeRedirectPath, REDIRECT_COOKIE } from "@/lib/redirect";

export const metadata: Metadata = {
  title: "Create Account | StudioSpace",
  description:
    "Create your StudioSpace account to discover and book creative studios and workspaces.",
};

const RegisterPage = async ({ searchParams }: PageProps<"/register">) => {
  const [{ redirectTo }, cookieStore] = await Promise.all([
    searchParams,
    cookies(),
  ]);

  const safeRedirectTo =
    getSafeRedirectPath(redirectTo, "") ||
    getSafeRedirectPath(cookieStore.get(REDIRECT_COOKIE)?.value);

  return (
    <main className="flex flex-1 items-start justify-center bg-background px-4 py-8 sm:px-6 sm:py-16 lg:py-20">
      <div className="my-auto w-full max-w-xl">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="h-7 gap-2 rounded-full border-border/70 bg-background px-3 text-xs font-medium text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-destructive"
            />
            Join StudioSpace
          </Badge>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            Create Your <span className="text-destructive">Account</span>
          </h1>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Sign up to discover and book creative workspaces.
          </p>
        </div>

        <RegisterForm redirectTo={safeRedirectTo} />
      </div>
    </main>
  );
};

export default RegisterPage;
