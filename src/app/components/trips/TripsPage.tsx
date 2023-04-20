"use client";

import { SerializedReservationWithListing } from "@/app/models/reservation.model";
import { SerializedUser } from "@/app/models/user.model";
import { Header } from "../Header";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ListingCard } from "../listings/ListingCard";

interface TripsPageProps {
  currentUser?: SerializedUser | null;
  reservations: SerializedReservationWithListing[];
}

export const TripsPage = ({ currentUser, reservations }: TripsPageProps) => {
  const [filteredReservations, setFilteredReservations] = useState(
    () => reservations
  );

  const onCancelReservation = useCallback(
    (id?: string) => {
      if (!id) return;

      const originalReservationsState = filteredReservations;

      setFilteredReservations((prev) => prev.filter((item) => item.id !== id));

      axios.delete("/api/reservations/" + id).catch((error) => {
        setFilteredReservations(originalReservationsState);
        toast.error(error?.message);
      });
    },
    [filteredReservations]
  );

  return (
    <div className="container p-5 pt-[6rem]">
      <Header title="Trips" subTitle="Your reserved trips" />
      <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:mt-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredReservations.map((reservation) => (
          <div key={reservation.id} className={"mb-6"}>
            <ListingCard
              actionId={reservation.id}
              user={currentUser}
              reservation={reservation}
              onAction={onCancelReservation}
              actionLabel="Cancel Reservation"
              listing={reservation.listing}
              showHeartButton={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsPage;
