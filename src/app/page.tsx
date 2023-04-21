import { ListingCard } from "./components/listings/ListingCard";
import { NoResults } from "./components/NoResults";
import { ListingParams } from "./models/listing.model";
import { getListings } from "./services/listings.service";
import { getCurrentUser } from "./services/user.session";

interface SearchParams {
  searchParams: ListingParams;
}

export default async function Home({ searchParams }: SearchParams) {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();

  if (!listings?.length) return <NoResults showResetButton />;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 p-10 pt-[11.5rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listings.map((listing) => (
          <ListingCard user={user} listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
}
