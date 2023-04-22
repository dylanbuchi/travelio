import { getFavoriteListings } from "../../services/favorites.service";
import { NoResults } from "@/components/NoResults";
import { getCurrentUser } from "../../services/user.session";
import FavoritesPage from "@/components/favorites/FavoritesPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Suspense } from "react";
import Loading from "../loading";

const FavoritesHomePage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!favoriteListings?.length)
    return (
      <NoResults
        title="No favorite listings found"
        subtitle="Go check some awesome listings and come back here later"
      />
    );

  return (
    <Suspense fallback={<Loading />}>
      <ProtectedRoute currentUser={currentUser}>
        <FavoritesPage
          favoriteListings={favoriteListings}
          currentUser={currentUser}
        />
      </ProtectedRoute>
    </Suspense>
  );
};

export default FavoritesHomePage;
