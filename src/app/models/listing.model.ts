import { Listing } from "@prisma/client";

export interface ListingParams {
  listingId: string;
}

export type SerializedListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
