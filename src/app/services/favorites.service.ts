import { prismaClient } from "../database/prisma-db";
import { serializeListing } from "../helpers/serializers.helper";
import { checkUserAuthentication } from "../middleware/auth.middleware";

export async function getFavoriteListings() {
  try {
    const user = await checkUserAuthentication();

    const favoriteListings = await prismaClient?.listing.findMany({
      where: {
        id: {
          in: [...user.favoriteIds],
        },
      },
    });

    const serializedFavoriteListings = favoriteListings.map((listing) => {
      return serializeListing(listing);
    });

    return serializedFavoriteListings;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
