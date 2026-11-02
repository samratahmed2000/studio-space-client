"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2Icon,
  CalendarDaysIcon,
  ChevronDownIcon,
  HeartIcon,
  LogOutIcon,
  PlusIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

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

type UserIdentityProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const UserIdentity = ({ name, email, image }: UserIdentityProps) => (
  <div className="flex items-center gap-3">
    <Avatar size="lg">
      {image ? (
        <AvatarImage
          referrerPolicy="no-referrer"
          src={image}
          alt={name ?? "User avatar"}
        />
      ) : null}
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
    <div className="flex min-w-0 flex-col">
      <span className="truncate text-sm font-semibold">{name}</span>
      <span className="truncate text-xs text-muted-foreground">{email}</span>
    </div>
  </div>
);

const AuthButtons = () => (
  <>
    <Link href="/login" className={buttonVariants({ variant: "outline" })}>
      Login
    </Link>

    <Link href="/register" className={buttonVariants()}>
      Register
    </Link>
  </>
);

const useLogout = () => {
  const router = useRouter();

  return async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };
};

const UserProfileDropdown = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const handleLogout = useLogout();

  if (isPending) {
    return (
      <Skeleton
        aria-hidden="true"
        className="h-10.5 w-17.5 rounded-full lg:w-44"
      />
    );
  }

  if (!user) {
    return <AuthButtons />;
  }

  return (
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
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-28 truncate text-sm font-medium lg:block">
          {user.name}
        </span>
        <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-aria-expanded:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-72">
        {/* User identity */}
        <div className="px-1.5 py-2">
          <UserIdentity
            name={user.name}
            email={user.email}
            image={user.image}
          />
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
  );
};

type UserProfilePanelProps = {
  onNavigate?: () => void;
};

const UserProfilePanel = ({ onNavigate }: UserProfilePanelProps) => {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const handleLogout = useLogout();
  const user = session?.user;

  if (isPending) {
    return <Skeleton aria-hidden="true" className="h-16.5 w-full rounded-xl" />;
  }

  if (!user) {
    return <AuthButtons />;
  }

  return (
    <>
      <div className="rounded-xl border border-border/70 bg-muted/40 p-3">
        <UserIdentity name={user.name} email={user.email} image={user.image} />
      </div>

      <nav className="flex flex-col gap-1">
        {accountLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              pathname === href && "bg-muted text-foreground font-semibold",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <Button
        variant="destructive"
        onClick={async () => {
          onNavigate?.();
          await handleLogout();
        }}
        className="mt-1 w-fill justify-start gap-2"
      >
        <LogOutIcon />
        Logout
      </Button>
    </>
  );
};

export { UserProfilePanel };
export default UserProfileDropdown;
