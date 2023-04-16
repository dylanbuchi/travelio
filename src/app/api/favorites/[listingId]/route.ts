import { NextResponse } from "next/server";
import { prismaClient } from "@/app/database/prisma-db";
import { checkUserAuthentication } from "@/app/middleware/auth.middleware";
import { SerializedUser } from "@/app/models/user.model";

interface Params {
  listingId?: string;
}

function checkListingId(listingId: unknown) {
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing id");
  }
  return listingId;
}

function getUserFavoriteIds(user: SerializedUser) {
  return [...user.favoriteIds];
}

export async function POST(request: Request, { params }: { params: Params }) {
  const user = await checkUserAuthentication();
  const listingId = checkListingId(params.listingId);

  let favoriteIds = getUserFavoriteIds(user);
  favoriteIds.push(listingId);

  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const user = await checkUserAuthentication();
  const listingId = checkListingId(params.listingId);

  let favoriteIds = getUserFavoriteIds(user);
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const updatedUser = await prismaClient.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(updatedUser);
}
