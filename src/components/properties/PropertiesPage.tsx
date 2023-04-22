"use client";

import { SerializedUser } from "@/models/user.model";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";
import { PageLayout } from "../layouts/PageLayout";
import { ListingCardLayout } from "../layouts/ListingCardLayout";
import { SerializedListing } from "@/models/listing.model";

interface PropertiesPageProps {
  currentUser?: SerializedUser | null;
  listings: SerializedListing[];
}

export const PropertiesPage = ({
  currentUser,
  listings,
}: PropertiesPageProps) => {
  const [filteredProperties, setFilteredProperties] = useState(() => [
    ...listings,
  ]);

  const onRemoveProperty = useCallback(
    (id?: string) => {
      if (
        !window?.confirm("Are you sure you want to remove this property?") ||
        !id
      )
        return;

      const originalProperties = [...filteredProperties];

      setFilteredProperties((prev) => prev.filter((item) => item.id !== id));

      axios.delete("/api/listings/" + id).catch((error) => {
        setFilteredProperties([...originalProperties]);
        toast.error(error?.message);
      });
    },
    [filteredProperties]
  );

  return (
    <PageLayout title="Properties" subTitle="Manage your listed properties">
      {filteredProperties.map((property) => (
        <ListingCardLayout key={property.id} size={filteredProperties.length}>
          <ListingCard
            actionId={property.id}
            user={currentUser}
            onAction={onRemoveProperty}
            actionLabel="Remove property"
            listing={property}
            showHeartButton={false}
          />
        </ListingCardLayout>
      ))}
    </PageLayout>
  );
};
