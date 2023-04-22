import { prismaClient } from "@/database/prisma-db";
import { checkUserAuthentication } from "@/middleware/auth.middleware";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  const currentUser = await checkUserAuthentication();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid reservation id");
  }

  const reservations = await prismaClient.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservations);
}
