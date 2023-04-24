import { SerializedListing } from "@/models/listing.model";
import { create } from "zustand";

type RequestMethod = "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | undefined;

interface ListingStore {
  listing: SerializedListing;
  setListing: (listing: SerializedListing) => void;
  requestMethod: RequestMethod;
  setRequestMethod: (requestMethod: RequestMethod) => void;
}

export const createListingStore = () =>
  create<ListingStore>((set) => ({
    requestMethod: "POST",
    listing: {} as SerializedListing,

    setRequestMethod: (requestMethod: RequestMethod) =>
      set({
        requestMethod,
      }),

    setListing: (listing: SerializedListing) =>
      set({
        listing,
      }),
  }));

export const listingStore = createListingStore();
