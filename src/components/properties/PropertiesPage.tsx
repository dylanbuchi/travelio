"use client";

import { SerializedUser } from "@/models/user.model";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";
import { PageLayout } from "../layouts/PageLayout";
import { ListingCardLayout } from "../layouts/ListingCardLayout";
import { SerializedListing } from "@/models/listing.model";
import { useRouter } from "next/navigation";
import { rentModalStore } from "@/store/modal.store";
import { Button } from "../buttons/Button";
import { listingStore } from "@/store/listing.store";

interface PropertiesPageProps {
  currentUser?: SerializedUser | null;
  listings: SerializedListing[];
}

export const PropertiesPage = ({
  currentUser,
  listings,
}: PropertiesPageProps) => {
  const router = useRouter();
  const { openModal } = rentModalStore();

  const { setRequestMethod, setListing } = listingStore();

  const onRemoveProperty = useCallback(
    (id?: string) => {
      if (
        !window?.confirm("Are you sure you want to remove this property?") ||
        !id
      )
        return;

      axios
        .delete("/api/listings/" + id)
        .then(() => router.refresh())
        .catch((error) => {
          toast.error(error?.message);
        });
    },
    [router]
  );

  return (
    <PageLayout title="Properties" subTitle="Manage your listed properties">
      {listings.map((property) => (
        <ListingCardLayout key={property.id} size={listings.length}>
          <ListingCard
            actionId={property.id}
            user={currentUser}
            onAction={onRemoveProperty}
            actionLabel="Remove property"
            listing={property}
            showHeartButton={false}
          />
          <Button
            classes="mt-2"
            outline
            isSmall
            label="Update property"
            onClick={(event) => {
              event?.stopPropagation();
              setRequestMethod("PATCH");
              setListing(property);
              openModal();
            }}
          />
        </ListingCardLayout>
      ))}
    </PageLayout>
  );
};
