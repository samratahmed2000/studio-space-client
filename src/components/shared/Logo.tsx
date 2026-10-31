import Image from "next/image";
import Link from "next/link";

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="StudioSpace home"
      className="flex w-fit items-center gap-2.5"
    >
      <Image
        src="/assets/logo-icon.png"
        alt=""
        width={40}
        height={40}
        loading="eager"
        className="size-9 rounded-full object-cover"
      />
      <span className="text-lg font-semibold tracking-tight text-black sm:text-xl dark:text-foreground">
        StudioSpace
      </span>
    </Link>
  );
};

export default Logo;
