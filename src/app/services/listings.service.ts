import { ListingParams, SerializedListing } from "../models/listing.model";
import { prismaClient } from "../database/prisma-db";
import { serializeListing } from "../helpers/serializers.helper";

export async function getListings() {
  try {
    const listings = await prismaClient?.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const serializedListings: SerializedListing[] | undefined = listings?.map(
      (item) => {
        return { ...item, createdAt: item.createdAt.toISOString() };
      }
    );

    return serializedListings;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}

export async function getListingById(params: ListingParams) {
  try {
    const listing = await prismaClient?.listing.findUnique({
      where: {
        id: params.listingId,
      },
    });

    if (!listing) return;

    const serializedListing = serializeListing(listing);

    return serializedListing;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
