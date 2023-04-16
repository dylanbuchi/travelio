"use client";

import { useFavorites } from "@/app/hooks/useFavorites";
import { SerializedUser } from "@/app/models/user.model";
import React, { useState } from "react";
import { TbHeart, TbHeartFilled } from "react-icons/tb";

interface HeartButtonProps {
  listingId: string;
  user?: SerializedUser | null;
}

export const HeartButton = ({ listingId, user }: HeartButtonProps) => {
  const { favorite, toggleFavorite } = useFavorites(listingId, user);
  const [hover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={toggleFavorite}
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
