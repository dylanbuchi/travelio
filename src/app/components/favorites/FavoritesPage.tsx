"use client";

import { SerializedListing } from "@/app/models/listing.model";
import { SerializedUser } from "@/app/models/user.model";
import { PageLayout } from "../layouts/PageLayout";
import { ListingCardLayout } from "../layouts/ListingCardLayout";
import { ListingCard } from "../listings/ListingCard";

interface FavoritesPageProps {
  currentUser?: SerializedUser | null;
  favoriteListings: SerializedListing[];
}

const FavoritesPage = ({
  currentUser,
  favoriteListings,
}: FavoritesPageProps) => {
  return (
    <PageLayout title="Favorites" subTitle="Manage your favorites listings">
      {favoriteListings.map((listing) => (
        <ListingCardLayout key={listing.id} size={favoriteListings.length}>
          <ListingCard
            actionId={listing.id}
            user={currentUser}
            listing={listing}
          />
        </ListingCardLayout>
      ))}
    </PageLayout>
  );
};

export default FavoritesPage;
