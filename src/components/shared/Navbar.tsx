"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "../../helper/Logo";
import NavLinks from "../../helper/NavLinks";
import UserProfileDropdown, {
  UserProfilePanel,
} from "../../helper/UserProfileDropdown";
import { ModeToggle } from "@/helper/ModeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <NavLinks />

        {/* Desktop Auth / User Profile */}
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />
          <UserProfileDropdown />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-2">
          <ModeToggle />

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

              <NavLinks variant="mobile" onNavigate={() => setIsOpen(false)} />

              {/* Mobile Auth / User Profile */}
              <div className="mt-auto flex flex-col gap-2 border-t p-4">
                <UserProfilePanel onNavigate={() => setIsOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
