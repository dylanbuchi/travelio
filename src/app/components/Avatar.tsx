import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const Avatar = ({
  src = "/images/avatar-placeholder.png",
  alt = "Avatar",
  size = 25,
  className,
}: AvatarProps) => {
  return (
    <Image
      loading="lazy"
      alt={alt}
      src={src}
      className={clsx("rounded-full", className)}
      height={size}
      width={size}
    />
  );
};
