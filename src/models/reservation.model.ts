import { Reservation } from "@prisma/client";
import { SerializedListing } from "./listing.model";

export type SerializedReservationWithListing = SerializedReservation & {
  listing: SerializedListing;
};

export interface ReservationParams {
  listingId?: string;
  userId?: string;
  ownerId?: string;
}

type RemovedReservationTypes = "createdAt" | "startDate" | "endDate";

export type SerializedReservation = Omit<
  Reservation,
  RemovedReservationTypes
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};
