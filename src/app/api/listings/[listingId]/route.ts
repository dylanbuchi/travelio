import { prismaClient } from "@/database/prisma-db";
import { NextResponse } from "next/server";
import { checkUserAuthentication } from "@/middleware/auth.middleware";
import { ListingParams } from "@/models/listing.model";

export async function DELETE(
  request: Request,
  { params }: { params: ListingParams }
) {
  try {
    const currentUser = await checkUserAuthentication();

    const listingId = params?.listingId;

    if (!listingId || typeof listingId !== "string")
      throw new Error("Invalid listing id");

    const listings = await prismaClient.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.error();
  }
}
