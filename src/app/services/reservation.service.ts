import {
  ReservationParams,
  SerializedReservationWithListing,
} from "../models/reservation.model";
import { prismaClient } from "@/app/database/prisma-db";
import {
  serializeListing,
  serializeReservation,
} from "../helpers/serializers.helper";

export async function getReservationsWithListing({
  listingId,
  ownerId,
  userId,
}: ReservationParams) {
  try {
    const query: any = {};

    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (ownerId) query.listing = { userId: ownerId };

    const reservationWithListings = await prismaClient.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
    });

    const serializedReservationsWithListing: SerializedReservationWithListing[] =
      reservationWithListings.map((reservation) => {
        return {
          ...serializeReservation(reservation),
          listing: { ...serializeListing(reservation.listing) },
        };
      });

    return serializedReservationsWithListing;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
