import { Suspense } from "react";
import { ListingCard } from "@/components/listings/ListingCard";
import { NoResults } from "@/components/NoResults";
import { ListingParams } from "@/models/listing.model";
import { getListings } from "@/services/listings.service";
import { getCurrentUser } from "@/services/user.session";
import Loading from "./loading";
import ListingsPage from "../components/listings/ListingsPage";

interface SearchParams {
  searchParams: ListingParams;
}

async function Home({ searchParams }: SearchParams) {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();

  if (!listings?.length) return <NoResults showResetButton />;

  return (
    <Suspense fallback={<Loading />}>
      <ListingsPage listings={listings} currentUser={user} />
    </Suspense>
  );
}
export default Home;
