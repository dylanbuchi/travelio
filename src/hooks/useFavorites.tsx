import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SerializedUser } from "@/models/user.model";
import { loginModalStore } from "@/store/modal.store";

export const useFavorites = (
  listingId: string,
  user?: SerializedUser | null
) => {
  const { openModal } = loginModalStore();

  const hasFavorite = useMemo(() => {
    const favoriteIds = user?.favoriteIds ?? [];
    return favoriteIds.includes(listingId);
  }, [user?.favoriteIds, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (!user?.email) return openModal();

      try {
        let request = hasFavorite
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await request();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [hasFavorite, listingId, openModal, user?.email]
  );

  return { hasFavorite, toggleFavorite };
};
