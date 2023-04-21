import { getFavoriteListings } from "../services/favorites.service";
import { NoResults } from "../components/NoResults";
import { getCurrentUser } from "../services/user.session";
import FavoritesPage from "../components/favorites/FavoritesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

const FavoritesHomePage = async () => {
  const favoriteListings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!favoriteListings.length)
    return (
      <NoResults
        title="No favorite listings found"
        subtitle="Go check some awesome listings and come back here later"
      />
    );

  return (
    <ProtectedRoute currentUser={currentUser}>
      <FavoritesPage
        favoriteListings={favoriteListings}
        currentUser={currentUser}
      />
    </ProtectedRoute>
  );
};

export default FavoritesHomePage;
