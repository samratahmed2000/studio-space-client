import Image from "next/image";
import Link from "next/link";

const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="StudioSpace home"
      className="flex w-fit items-center"
    >
      <Image
        src="/assets/logo-icon.jpg"
        alt=""
        width={36}
        height={36}
        loading="eager"
        className="size-9 rounded-full object-cover"
      />
      <span className="-ml-0.5 text-lg font-semibold tracking-tight text-black sm:text-xl dark:text-foreground">
        StudioSpace
      </span>
    </Link>
  );
};

export default Logo;
