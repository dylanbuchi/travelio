import { NextResponse } from "next/server";
import { prismaClient } from "@/database/prisma-db";
import { checkUserAuthentication } from "@/middleware/auth.middleware";
import { SerializedUser } from "@/models/user.model";
import { serializeUser } from "@/helpers/serializers.helper";

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

  return NextResponse.json(serializeUser(updatedUser));
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

  return NextResponse.json(serializeUser(updatedUser));
}
