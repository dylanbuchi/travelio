import { Listing } from "@prisma/client";

export interface ListingParams {
  listingId?: string;
  userId?: string;

  category?: string;

  bathroomCount?: string;
  roomCount?: string;
  guestCount?: string;

  startDate?: string;
  endDate?: string;
  location?: string;
}

export type SerializedListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
