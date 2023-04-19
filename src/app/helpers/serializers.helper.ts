import { Listing, Reservation, User } from "@prisma/client";
import { SerializedUser } from "../models/user.model";
import { SerializedListing } from "../models/listing.model";
import { SerializedReservation } from "../models/reservation.model";

export function serializeUser(user: User) {
  const { password, ...userWithoutPassword } = user;

  const serializedUser: SerializedUser = {
    ...userWithoutPassword,
    createdAt: userWithoutPassword.createdAt.toISOString(),
    updatedAt: userWithoutPassword.updatedAt.toISOString(),
    emailVerified: userWithoutPassword.emailVerified?.toISOString(),
  };
  return serializedUser;
}

export function serializeListing(listing: Listing) {
  const serializedListing: SerializedListing = {
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  };
  return serializedListing;
}

export function serializeReservation(reservation: Reservation) {
  const serializedReservation: SerializedReservation = {
    ...reservation,
    createdAt: reservation.createdAt.toISOString(),
    endDate: reservation.endDate.toISOString(),
    startDate: reservation.startDate.toISOString(),
  };

  return serializedReservation;
}
