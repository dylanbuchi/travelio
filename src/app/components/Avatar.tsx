"use client";

import Image from "next/image";
import clsx from "clsx";
import placeholderImage from "../../../public/images/avatar-placeholder.png";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

export const Avatar = ({
  src = placeholderImage.src,
  alt = "Avatar",
  size = 25,
  className,
}: AvatarProps) => {
  const imageSrc = src ?? placeholderImage.src;
  return (
    <Image
      loading="lazy"
      alt={alt}
      src={imageSrc}
      className={clsx("rounded-full", className)}
      height={size}
      width={size}
    />
  );
};
