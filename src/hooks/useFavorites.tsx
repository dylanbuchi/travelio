import axios from "axios";
import { useCallback, useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { SerializedUser } from "@/models/user.model";
import { loginModalStore } from "@/store/modal.store";
import { useRouter } from "next/navigation";

export const useFavorites = (
  listingId: string,
  user?: SerializedUser | null
) => {
  const { openModal } = loginModalStore();

  const router = useRouter();

  const favorite = useMemo(() => {
    const favoriteIds = user?.favoriteIds ?? [];
    return favoriteIds.includes(listingId);
  }, [user?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (!user?.email) return openModal();

      try {
        let request = favorite
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await request();
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [favorite, listingId, openModal, router, user?.email]
  );

  return { favorite, toggleFavorite };
};
