"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About Us", href: "#about" },
] as const;

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenu = false,
  ) => {
    const isHome = href === "/";
    const isHash = href.startsWith("#");

    if (isHome && pathname !== "/") return;
    if (isHash && !document.getElementById(href.slice(1))) return;
    if (!isHome && !isHash) return;

    event.preventDefault();
    if (closeMenu) setIsOpen(false);

    const scroll = () => {
      if (isHome) {
        window.scrollTo({ top: 0, behavior: getScrollBehavior() });
      } else {
        document
          .getElementById(href.slice(1))
          ?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
      }

      window.history.replaceState(window.history.state, "", href);
    };

    if (closeMenu) {
      window.setTimeout(scroll, 250);
    } else {
      scroll();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="justify-self-start">
          <Logo />
        </div>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => handleAnchorClick(event, link.href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-secondary font-semibold text-secondary-foreground"
                    : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 justify-self-end md:flex">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={cn(buttonVariants({ size: "lg" }), "px-4")}
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="justify-self-end md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="destructive"
                  size="icon-lg"
                  aria-label="Open navigation menu"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader className="border-b">
                <SheetTitle className="sr-only">
                  StudioSpace navigation
                </SheetTitle>
                <Logo onClick={() => setIsOpen(false)} />
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-col gap-1 px-4"
              >
                {navLinks.map((link) => {
                  const active = isActivePath(pathname, link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(event) => {
                        handleAnchorClick(event, link.href, true);
                        setIsOpen(false);
                      }}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-10 items-center rounded-lg px-3 text-sm transition-colors",
                        active
                          ? "bg-secondary font-semibold text-secondary-foreground"
                          : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "w-full",
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "lg" }),
                    "w-full",
                  )}
                >
                  Register
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
