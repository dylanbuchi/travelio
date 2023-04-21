import { NoResults } from "../components/NoResults";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { getCurrentUser } from "../services/user.session";
import { getListings } from "../services/listings.service";
import { PropertiesPage } from "../components/properties/PropertiesPage";
import { Suspense } from "react";
import Loading from "../loading";

const PropertiesHomePage = async () => {
  const currentUser = await getCurrentUser();

  const listings = await getListings({
    userId: currentUser?.id,
  });

  if (!listings.length)
    return (
      <NoResults
        title="No properties found"
        subtitle="Try adding a new property"
      />
    );

  return (
    <Suspense fallback={<Loading />}>
      <ProtectedRoute currentUser={currentUser}>
        <PropertiesPage currentUser={currentUser} listings={listings} />
      </ProtectedRoute>
    </Suspense>
  );
};

export default PropertiesHomePage;
