"use client";

import axios from "axios";

import { ListingCardLayout } from "../layouts/ListingCardLayout";
import { SerializedReservationWithListing } from "@/models/reservation.model";
import { SerializedUser } from "@/models/user.model";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";
import { PageLayout } from "../layouts/PageLayout";
import { useRouter } from "next/navigation";

interface ReservationPageProps {
  currentUser?: SerializedUser | null;
  reservations: SerializedReservationWithListing[];
}

export const ReservationPage = ({
  currentUser,
  reservations,
}: ReservationPageProps) => {
  const [filteredReservations, setFilteredReservations] = useState(() => [
    ...reservations,
  ]);

  const router = useRouter();

  const onCancelReservation = useCallback(
    (reservationId?: string) => {
      if (
        !window?.confirm("Are you sure you want to cancel your reservation?") ||
        !reservationId
      )
        return;

      const original = [...filteredReservations];

      setFilteredReservations((prev) =>
        prev.filter((item) => item.id !== reservationId)
      );

      axios
        .delete("/api/reservations/" + reservationId)
        .then(() => router.refresh())
        .catch((error) => {
          toast.error(error?.message);
          setFilteredReservations([...original]);
        });
    },
    [filteredReservations, router]
  );
  return (
    <PageLayout
      title="Reservations"
      subTitle="Manage the bookings on your properties"
    >
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
