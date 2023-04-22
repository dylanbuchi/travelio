"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { SerializedUser } from "@/models/user.model";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

interface HeartButtonProps {
  listingId: string;
  user?: SerializedUser | null;
}

export const HeartButton = ({ listingId, user }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorites(listingId, user);
  const [favorite, setFavorite] = useState<boolean>(hasFavorite);

  const [hover, setIsHover] = useState(false);
  const router = useRouter();

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={(event) => {
        if (user) setFavorite((prev) => !prev);
        toggleFavorite(event);
        router.refresh();
      }}
      className="relative cursor-pointer transition hover:opacity-60"
    >
      {favorite ? (
        <TbHeartFilled size={29} color="red" />
      ) : (
        <TbHeart size={28} color={hover ? "red" : "#f2f2f2"} />
      )}
    </div>
  );
};
