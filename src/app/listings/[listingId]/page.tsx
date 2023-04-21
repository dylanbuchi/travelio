import { NoResults } from "@/app/components/NoResults";
import { ListingCardExpanded } from "@/app/components/listings/ListingCardExpanded";
import Loading from "@/app/loading";
import { ListingParams } from "@/app/models/listing.model";
import { getListingById } from "@/app/services/listings.service";
import { getReservationsWithListing } from "@/app/services/reservation.service";
import { getUserById } from "@/app/services/user.service";
import { getCurrentUser } from "@/app/services/user.session";
import { Suspense } from "react";

const ListingPage = async ({ params }: { params: ListingParams }) => {
  const reservationsWithListing = await getReservationsWithListing(params);
  const listing = params?.listingId
    ? await getListingById(params.listingId)
    : undefined;

  const listingOwner = await getUserById({ userId: listing?.userId ?? "" });
  const currentUser = await getCurrentUser();

  if (!listing) return <NoResults />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto flex justify-center pt-[3rem] sm:pt-[6rem]">
        <ListingCardExpanded
          listing={listing}
          user={listingOwner}
          currentUser={currentUser}
          reservations={reservationsWithListing}
        />
      </div>
    </Suspense>
  );
};

export default ListingPage;
