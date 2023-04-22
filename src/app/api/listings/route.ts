import { prismaClient } from "@/database/prisma-db";
import { NextResponse } from "next/server";
import { checkUserAuthentication } from "@/middleware/auth.middleware";
import { serializeListing } from "@/helpers/serializers.helper";
import { Listing } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const user = await checkUserAuthentication();
    const listingData: Listing = await request.json();

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

    const listing = await prismaClient.listing.create({
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

    return NextResponse.json(serializeListing(listing));
  } catch (error) {
    return NextResponse.error();
  }
}
