"use client";

import { useState } from "react";
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

import Logo from "../../helper/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeSection;
    }

    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.split("#")[1];
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkStyle = (href: string) =>
    cn(
      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
      isActive(href)
        ? "bg-destructive/40 text-black font-semibold"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                if (link.href.startsWith("/#")) {
                  setActiveSection(link.href.split("#")[1]);
                } else {
                  setActiveSection("");
                }

                setIsOpen(false);
              }}
              className={linkStyle(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>

          <Link href="/register" className={buttonVariants()}>
            Register
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <MenuIcon />
                </Button>
              }
            />

            <SheetContent side="right" className="flex w-72 flex-col">
              <SheetHeader className="border-b">
                <SheetTitle className="sr-only">
                  StudioSpace Navigation
                </SheetTitle>
                <Logo onClick={() => setIsOpen(false)} />
              </SheetHeader>

              <nav className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      if (link.href.startsWith("/#")) {
                        setActiveSection(link.href.split("#")[1]);
                      } else {
                        setActiveSection("");
                      }

                      setIsOpen(false);
                    }}
                    className={linkStyle(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants()}
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
