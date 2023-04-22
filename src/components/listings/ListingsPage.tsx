"use client";
import { ListingCard } from "@/components/listings/ListingCard";
import { SerializedListing } from "../../models/listing.model";
import { SerializedUser } from "../../models/user.model";

interface ListingPageProps {
  listings: SerializedListing[];
  currentUser?: SerializedUser | null;
}
const ListingsPage = ({ listings, currentUser }: ListingPageProps) => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 p-10 pt-[11.5rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listings.map((listing) => (
          <ListingCard user={currentUser} listing={listing} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
