import Image from "next/image";
import Link from "next/link";

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="StudioSpace home"
      className="flex w-fit items-start gap-1.5"
    >
      <Image
        src="/assets/logo-icon.jpg"
        alt=""
        width={28}
        height={28}
        loading="eager"
        className="size-7 rounded-full object-cover"
      />
      <span className="-ml-0.5 text-2xl font-bold tracking-tight text-black dark:text-foreground">
        Studio<span className="text-destructive">Space</span>
      </span>
    </Link>
  );
};

export default Logo;
