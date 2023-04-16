import { prismaClient } from "@/app/database/prisma-db";
import { NextResponse } from "next/server";
import { Listing } from "prisma/prisma-client";
import { checkUserAuthentication } from "@/app/middleware/auth.middleware";
import { serializeListing } from "@/app/helpers/serializers.helper";

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
