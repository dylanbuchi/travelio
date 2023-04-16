export async function getListings() {
  try {
    const listings = await prismaClient?.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
