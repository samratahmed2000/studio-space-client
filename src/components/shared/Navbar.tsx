"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2Icon,
  CalendarDaysIcon,
  ChevronDownIcon,
  HeartIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logo from "../../helper/Logo";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];

const accountLinks = [
  { label: "Add New Studio", href: "/add-studio", icon: PlusIcon },
  { label: "My Studio Listings", href: "/my-listings", icon: Building2Icon },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarDaysIcon },
  { label: "Wishlist Studios", href: "/studio-wishlist", icon: HeartIcon },
];

const getInitials = (name?: string | null) => {
  const initials = (name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "U";
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
        ? "bg-muted-foreground/10 text-black font-semibold"
        : "text-muted-foreground hover:bg-muted hover:text-foreground",
    );

  const { data: session } = useSession();
  const user = session?.user;
  const initials = getInitials(user?.name);

  const handleNavigate = (href: string) => {
    if (href.startsWith("/#")) {
      setActiveSection(href.split("#")[1]);
    } else {
      setActiveSection("");
    }

    setIsOpen(false);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

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
              onClick={() => handleNavigate(link.href)}
              className={linkStyle(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open account menu"
                    className="group flex cursor-pointer items-center gap-2 rounded-full border border-border/70 bg-background py-1 pr-2 pl-1 transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                }
              >
                <Avatar>
                  {user.image ? (
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user.image}
                      alt={user.name ?? "User avatar"}
                    />
                  ) : null}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-28 truncate text-sm font-medium lg:block">
                  {user.name}
                </span>
                <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-aria-expanded:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={8} className="w-72">
                {/* User identity */}
                <div className="flex items-center gap-3 px-1.5 py-2">
                  <Avatar size="lg">
                    {user.image ? (
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image}
                        alt={user.name ?? "User avatar"}
                      />
                    ) : null}
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-semibold">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  {accountLinks.map(({ label, href, icon: Icon }) => (
                    <DropdownMenuItem
                      key={href}
                      render={<Link href={href} />}
                      className="gap-2 px-2 py-1.5"
                    >
                      <Icon />
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="gap-2 px-2 py-1.5"
                >
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>

              <Link href="/register" className={buttonVariants()}>
                Register
              </Link>
            </>
          )}
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

              <nav className="flex flex-col gap-2 overflow-y-auto px-4">
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

              {/* Mobile Auth Buttons */}
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/40 p-3">
                      <Avatar size="lg">
                        {user.image ? (
                          <AvatarImage
                            referrerPolicy="no-referrer"
                            src={user.image}
                            alt={user.name ?? "User avatar"}
                          />
                        ) : null}
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-semibold">
                          {user.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <nav className="flex flex-col gap-1">
                      {accountLinks.map(({ label, href, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                            pathname === href &&
                              "bg-muted text-foreground font-semibold",
                          )}
                        >
                          <Icon className="size-4" />
                          {label}
                        </Link>
                      ))}
                    </nav>

                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="mt-1 w-full justify-start gap-2"
                    >
                      <LogOutIcon />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Login
                    </Link>

                    <Link href="/register" className={buttonVariants()}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
