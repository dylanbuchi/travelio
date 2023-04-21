import { ListingParams, SerializedListing } from "../models/listing.model";
import { prismaClient } from "../database/prisma-db";
import { serializeListing } from "../helpers/serializers.helper";

export async function getListings(params: ListingParams) {
  try {
    let query: any = {};

    if (params?.userId) query.userId = params.userId;

    if (params?.roomCount)
      query.roomCount = { gte: parseInt(params.roomCount) };
    if (params?.bathroomCount)
      query.bathroomCount = { gte: parseInt(params.bathroomCount) };
    if (params?.guestCount)
      query.guestCount = { gte: parseInt(params.guestCount) };

    if (params?.location) query.location = params.location;

    if (params?.category) query.category = params.category;

    if (params?.startDate && params?.endDate) {
      query.NOT = {
        reservations: {
          // filter out listings that are reserved
          some: {
            OR: [
              {
                endDate: { gte: params.startDate },
                startDate: { lte: params.startDate },
              },
              {
                startDate: { lte: params.endDate },
                endDate: { gte: params.endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prismaClient?.listing.findMany({
      where: query,

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

export async function getListingById(listingId: string) {
  try {
    const listing = await prismaClient?.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) return;
    const serializedListing = serializeListing(listing);

    return serializedListing;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
