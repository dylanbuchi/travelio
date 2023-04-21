"use client";

import { SerializedReservationWithListing } from "@/app/models/reservation.model";
import { SerializedUser } from "@/app/models/user.model";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";
import { PageLayout } from "../layouts/PageLayout";
import { ListingCardLayout } from "../layouts/ListingCardLayout";

interface TripsPageProps {
  currentUser?: SerializedUser | null;
  reservations: SerializedReservationWithListing[];
}

export const TripsPage = ({ currentUser, reservations }: TripsPageProps) => {
  const [filteredReservations, setFilteredReservations] = useState(() => [
    ...reservations,
  ]);

  const onCancelReservation = useCallback(
    (id?: string) => {
      if (
        !window?.confirm(
          "Are you sure you want to cancel this guest reservation?"
        ) ||
        !id
      )
        return;

      const originalReservationsState = [...filteredReservations];

      setFilteredReservations((prev) => prev.filter((item) => item.id !== id));

      axios
        .delete("/api/reservations/" + id)

        .catch((error) => {
          setFilteredReservations([...originalReservationsState]);
          toast.error(error?.message);
        });
    },
    [filteredReservations]
  );

  return (
    <PageLayout title="Trips" subTitle="Your reserved trips">
      {filteredReservations.map((reservation) => (
        <ListingCardLayout
          key={reservation.id}
          size={filteredReservations.length}
        >
          <ListingCard
            actionId={reservation.id}
            user={currentUser}
            reservation={reservation}
            onAction={onCancelReservation}
            actionLabel="Cancel Reservation"
            listing={reservation.listing}
            showHeartButton={false}
          />
        </ListingCardLayout>
      ))}
    </PageLayout>
  );
};
