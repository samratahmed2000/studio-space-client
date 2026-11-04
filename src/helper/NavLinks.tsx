"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];

type NavLinksProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

const NavLinks = ({ variant = "desktop", onNavigate }: NavLinksProps) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !activeSection;
    }

    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.split("#")[1];
    }

    return pathname === href;
  };

  const linkStyle = (href: string) =>
    cn(
      "rounded-full px-3 py-2 text-sm font-medium transition-colors",
      isActive(href)
        ? "bg-muted-foreground/10 font-semibold"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  const handleNavigate = (href: string) => {
    if (href.startsWith("/#")) {
      setActiveSection(href.split("#")[1]);
    } else {
      setActiveSection("");
    }

    onNavigate?.();
  };

  return (
    <nav
      className={cn(
        variant === "desktop"
          ? "hidden items-center gap-1 md:flex"
          : "flex flex-col gap-2 overflow-y-auto px-4",
      )}
    >
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => handleNavigate(link.href)}
          className={linkStyle(link.href)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
