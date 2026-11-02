"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import GoogleAuthButton from "./GoogleAuthButton";
import { signIn } from "@/lib/auth-client";
import { getSafeRedirectPath, withRedirectTo } from "@/lib/redirect";
import { EMAIL_PATTERN } from "@/lib/validation";

type FormErrors = {
  email?: string;
  password?: string;
};

type LoginFormProps = {
  redirectTo?: string;
};

const LoginForm = ({ redirectTo }: LoginFormProps) => {
  const router = useRouter();
  const safeRedirectTo = getSafeRedirectPath(redirectTo);
  const registerHref = withRedirectTo("/register", safeRedirectTo);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: FormErrors = {};

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Please enter your password.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.add({
          type: "error",
          title: "Login Failed",
          description:
            error.message || "Invalid email or password. Please try again.",
        });

        setIsLoading(false);
        return;
      }

      toast.add({
        type: "success",
        title: "Welcome Back",
        description: "You have been logged in successfully.",
      });

      router.push(safeRedirectTo);
    } catch (error) {
      console.error("Failed to Login:", error);

      toast.add({
        type: "error",
        title: "Login Failed",
        description: "Could not reach the authentication server.",
      });

      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-6 w-full [--card-spacing:--spacing(5)] sm:mt-8 sm:[--card-spacing:--spacing(6)] lg:[--card-spacing:--spacing(8)]">
      <form
        onSubmit={handleEmailLogin}
        noValidate
        className="px-(--card-spacing)"
      >
        <FieldGroup>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">
              Email <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className="h-11 border-border/70 focus-visible:ring-foreground/20 sm:h-10"
            />
            <FieldError>{errors.email}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.password)}>
            <FieldLabel htmlFor="password">
              Password <span className="text-destructive">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                className="h-11 border-border/70 pr-11 focus-visible:ring-foreground/20 sm:h-10 sm:pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:w-10"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
            <FieldError>{errors.password}</FieldError>
          </Field>

          <Field>
            <Button
              type="submit"
              className="h-11 w-full sm:h-10"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Field>

          <FieldSeparator className="**:data-[slot=field-separator-content]:bg-card">
            Or
          </FieldSeparator>

          <Field>
            <GoogleAuthButton
              disabled={isLoading}
              callbackURL={safeRedirectTo}
            />
          </Field>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href={registerHref}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </p>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default LoginForm;
