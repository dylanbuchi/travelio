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

export async function PATCH(
  request: Request,
  { params }: { params: ListingParams }
) {
  try {
    const user = await checkUserAuthentication();
    const listingData = await request.json();
    const listingId = params?.listingId;

    if (!listingId || typeof listingId !== "string")
      throw new Error("Invalid listing id");

    const {
      title,
      description,
      image,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      location,
      price,
    } = listingData;

    const listing = await prismaClient.listing.updateMany({
      where: { id: listingId, userId: user.id },
      data: {
        title,
        description,
        image,
        category,
        roomCount,
        guestCount,
        bathroomCount,
        location,
        price,
        userId: user.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
}
