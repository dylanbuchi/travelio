import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { SerializedUser } from "../models/user.model";
import { useRouter } from "next/navigation";
import { loginModalStore } from "../store/modal.store";

export const useFavorites = (
  listingId: string,
  user?: SerializedUser | null
) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [user?.favoriteIds, router]);

  const { openModal } = loginModalStore();

  const hasFavorite = useMemo(() => {
    const favoriteIds = user?.favoriteIds ?? [];
    return favoriteIds.includes(listingId);
  }, [user?.favoriteIds, listingId]);

  const [favorite, setFavorite] = useState(() => hasFavorite);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      if (!user?.email) return openModal();
      setFavorite((prev) => !prev);

      try {
        let request = hasFavorite
          ? () => axios.delete(`/api/favorites/${listingId}`)
          : () => axios.post(`/api/favorites/${listingId}`);

        await request();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [hasFavorite, listingId, openModal, user]
  );

  return { favorite, toggleFavorite };
};
