"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { SendIcon } from "lucide-react";
import { useState } from "react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.add({
        title: "Success!",
        description: `Thanks! You've successfully subscribed with ${email}`,
        timeout: 3000,
      });

      setEmail("");
    } catch (error) {
      console.error(error);

      toast.add({
        title: "Error",
        description: "Something went wrong. Please try again.",
        timeout: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {" "}
      <div className="w-full max-w-md">
        <h3 className="text-xs font-semibold tracking-wider text-foreground uppercase">
          Newsletter
        </h3>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          New spaces, booking tips, and host news - once a month.
        </p>

        <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2">
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Email address
          </label>

          <Input
            id="footer-newsletter-email"
            type="email"
            required
            placeholder="me@mail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 bg-background px-3"
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="h-10 w-full gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
            {!isLoading && <SendIcon aria-hidden="true" className="size-4" />}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
