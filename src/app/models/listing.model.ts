import { Listing } from "@prisma/client";

export type SerializedListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
