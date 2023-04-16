import { SerializedListing } from "../models/listing.model";

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
