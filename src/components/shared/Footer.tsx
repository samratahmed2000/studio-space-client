import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Logo from "../../helper/Logo";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "@/helper/NewsletterForm";
import getCategory from "@/data-fetch/CategoryData";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
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

const Footer = async () => {
  const popularCategories = await getCategory();

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
                <li key={category._id}>
                  <FooterLink href={category._id} label={category.title} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <NewsletterForm />
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
