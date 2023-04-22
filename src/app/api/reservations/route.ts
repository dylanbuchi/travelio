import { NextResponse } from "next/server";
import { prismaClient } from "@/database/prisma-db";
import { checkUserAuthentication } from "@/middleware/auth.middleware";
import { Reservation } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const user = await checkUserAuthentication();

    const reservationData: Reservation = await request.json();

    for (const key in reservationData) {
      if (reservationData[key as keyof Reservation] == null) {
        throw NextResponse.error();
      }
    }

    const listingWithReservation = await prismaClient.listing.update({
      where: {
        id: reservationData.listingId,
      },
      data: {
        reservations: {
          create: {
            createdAt: reservationData.createdAt,
            endDate: reservationData.endDate,
            startDate: reservationData.startDate,
            totalPrice: reservationData.totalPrice,
            userId: user.id,
          },
        },
      },
    });

    return NextResponse.json(listingWithReservation);
  } catch (error) {
    return NextResponse.error();
  }
}
