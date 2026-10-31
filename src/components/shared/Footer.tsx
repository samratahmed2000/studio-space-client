"use client";

import { useState } from "react";
import Link from "next/link";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
] as const;

const popularCategories = [
  { label: "Photo Studios", href: "/studios?category=photo-studios" },
  {
    label: "Cinema Sound Stages",
    href: "/studios?category=cinema-sound-stages",
  },
  { label: "Podcast Rooms", href: "/studios?category=podcast-room" },
  { label: "Music Suites", href: "/studios?category=music-suites" },
  { label: "Art Workshops", href: "/studios?category=art-workshops" },
] as const;

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      {label}
    </Link>
  );
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-3 lg:gap-12 lg:px-8 lg:py-16">
        {/* Brand & Social */}
        <div className="flex flex-col gap-6">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Book creative spaces by the hour. StudioSpace connects hosts and
              creators so every shoot starts in the right room - no calls, no
              back-and-forth.
            </p>
          </div>

          <SocialLinks />
        </div>

        {/* Navigation & Categories */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:justify-items-center">
          <nav aria-labelledby="footer-navigation-heading">
            <h3
              id="footer-navigation-heading"
              className="text-xs font-semibold tracking-wider text-foreground uppercase"
            >
              Navigation
            </h3>

            <ul className="mt-4 space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-categories-heading">
            <h3
              id="footer-categories-heading"
              className="text-xs font-semibold tracking-wider text-foreground uppercase"
            >
              Popular Categories
            </h3>

            <ul className="mt-4 space-y-3">
              {popularCategories.map((category) => (
                <li key={category.href}>
                  <FooterLink href={category.href} label={category.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
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
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-10 bg-background px-3"
            />

            <Button type="submit" className="h-10 w-full gap-2">
              Subscribe
              <SendIcon aria-hidden="true" className="size-4" />
            </Button>
          </form>

          <p
            aria-live="polite"
            className="mt-2 min-h-4 text-xs text-muted-foreground"
          >
            {subscribed ? "Thanks - you're on the list." : null}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Separator />

        <div className="flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms &amp; Conditions
            </Link>

            <span aria-hidden="true" className="h-3 w-px bg-border" />

            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
