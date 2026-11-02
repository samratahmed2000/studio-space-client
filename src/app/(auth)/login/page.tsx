import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login | StudioSpace",
  description:
    "Login to your StudioSpace account to manage your bookings and studio listings.",
};

const LoginPage = () => {
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
            Welcome To StudioSpace
          </Badge>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            Login To Your <span className="text-destructive">Account</span>
          </h1>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Sign in to manage your bookings and creative spaces.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
