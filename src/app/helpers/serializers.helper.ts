import { Listing, User } from "@prisma/client";
import { SerializedUser } from "../models/user.model";
import { SerializedListing } from "../models/listing.model";

export function serializeUser(user: User) {
  const { password, ...userWithoutPassword } = user;
  const serializedUser: SerializedUser = {
    ...userWithoutPassword,
    createdAt: userWithoutPassword.createdAt.toISOString(),
    updatedAt: userWithoutPassword.updatedAt.toISOString(),
    emailVerified: userWithoutPassword.emailVerified?.toISOString(),
  };
  return serializedUser;
}

export function serializeListing(listing: Listing) {
  const serializedListing: SerializedListing = {
    ...listing,
    createdAt: listing.createdAt.toISOString(),
  };
  return serializedListing;
}
