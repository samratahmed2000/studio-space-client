"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import GoogleAuthButton from "./GoogleAuthButton";
import { signOut, signUp } from "@/lib/auth-client";
import { withRedirectTo } from "@/lib/redirect";
import { EMAIL_PATTERN, isValidUrl, validatePassword } from "@/lib/validation";

type FormErrors = {
  name?: string;
  email?: string;
  imageUrl?: string;
  password?: string;
};

type RegisterFormProps = {
  redirectTo?: string;
};

const RegisterForm = ({ redirectTo }: RegisterFormProps) => {
  const router = useRouter();
  const loginHref = withRedirectTo("/login", redirectTo);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailRegister = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const nextErrors: FormErrors = {};

    if (!name) {
      nextErrors.name = "Please enter your name.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      nextErrors.imageUrl = "Please enter a valid image URL (http/https).";
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
      nextErrors.password = passwordError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
        image: imageUrl || undefined,
      });

      if (error) {
        toast.add({
          type: "error",
          title: "Registration Failed",
          description:
            error.message || "Something went wrong. Please try again.",
        });

        setIsLoading(false);
        return;
      }

      toast.add({
        type: "success",
        title: "Account Created",
        description: "Your account is ready. Please log in to continue.",
      });

      // better-auth signs the user in right after registering. Sign them out
      // so the profile menu only appears after an explicit login.
      await signOut();

      router.push(loginHref);
    } catch (error) {
      console.error("Failed to Register:", error);

      toast.add({
        type: "error",
        title: "Registration Failed",
        description: "Could not reach the authentication server.",
      });

      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto mt-6 w-full [--card-spacing:--spacing(5)] sm:mt-8 sm:[--card-spacing:--spacing(6)] lg:[--card-spacing:--spacing(8)]">
      <form
        onSubmit={handleEmailRegister}
        noValidate
        className="px-(--card-spacing)"
      >
        <FieldGroup>
          <Field data-invalid={Boolean(errors.name)}>
            <FieldLabel htmlFor="name">
              Name <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ahmed"
              aria-invalid={Boolean(errors.name)}
              className="h-11 border-border/70 focus-visible:ring-foreground/20 sm:h-10"
            />
            <FieldError>{errors.name}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">
              Email <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="me@mail.com"
              aria-invalid={Boolean(errors.email)}
              className="h-11 border-border/70 focus-visible:ring-foreground/20 sm:h-10"
            />
            <FieldError>{errors.email}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.imageUrl)}>
            <FieldLabel htmlFor="imageUrl">Profile Image URL</FieldLabel>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              aria-invalid={Boolean(errors.imageUrl)}
              className="h-11 border-border/70 focus-visible:ring-foreground/20 sm:h-10"
            />
            <FieldError>{errors.imageUrl}</FieldError>
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
                autoComplete="new-password"
                placeholder="Create a strong password"
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
            <FieldDescription className="flex items-center gap-1.5">
              <LockKeyholeIcon className="size-3.5" />
              At least 6 characters, an uppercase, a lowercase
            </FieldDescription>
            <FieldError>{errors.password}</FieldError>
          </Field>

          <Field>
            <Button
              type="submit"
              className="h-11 w-full sm:h-10"
              disabled={isLoading}
            >
              {isLoading && <Spinner />}
              {isLoading ? "Creating..." : "Register"}
            </Button>
          </Field>

          <FieldSeparator className="**:data-[slot=field-separator-content]:bg-card">
            Or
          </FieldSeparator>

          <Field>
            <GoogleAuthButton disabled={isLoading} callbackURL={redirectTo} />
          </Field>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={loginHref}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </p>
        </FieldGroup>
      </form>
    </Card>
  );
};

export default RegisterForm;
