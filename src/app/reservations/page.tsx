import { NoResults } from "../components/NoResults";
import { ReservationPage } from "../components/reservations/ReservationPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { getReservationsWithListing } from "../services/reservation.service";
import { getCurrentUser } from "../services/user.session";

const ReservationsHomePage = async () => {
  const currentUser = await getCurrentUser();

  const reservationsWithListing = await getReservationsWithListing({
    ownerId: currentUser?.id,
  });

  if (!reservationsWithListing.length)
    return (
      <NoResults
        title="No reservations found"
        subtitle="Come back later to see if someone reserved one of your properties"
      />
    );

  return (
    <ProtectedRoute currentUser={currentUser}>
      <ReservationPage
        reservations={reservationsWithListing}
        currentUser={currentUser}
      />
    </ProtectedRoute>
  );
};

export default ReservationsHomePage;
