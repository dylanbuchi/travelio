import { NoResults } from "@/components/NoResults";
import { TripsPage } from "@/components/trips/TripsPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getReservationsWithListing } from "../../services/reservation.service";
import { getCurrentUser } from "../../services/user.session";
import Loading from "../loading";
import { Suspense } from "react";

const TripsHomePage = async () => {
  const currentUser = await getCurrentUser();

  const reservationsWithListing = await getReservationsWithListing({
    userId: currentUser?.id,
  });

  if (!reservationsWithListing?.length)
    return (
      <NoResults title="No trips found" subtitle="Try reserving a trip!" />
    );

  return (
    <Suspense fallback={<Loading />}>
      <ProtectedRoute currentUser={currentUser}>
        <TripsPage
          currentUser={currentUser}
          reservations={reservationsWithListing}
        />
      </ProtectedRoute>
    </Suspense>
  );
};

export default TripsHomePage;
