import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { prismaClient } from "@/database/prisma-db";
import { getServerSession } from "next-auth";
import { SerializedUser } from "../models/user.model";

export async function getSession() {
  return await getServerSession(nextAuthOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const {
      user: { email: userEmail },
    } = session;

    const currentUser = await prismaClient?.user.findUnique({
      where: { email: userEmail },
    });

    if (!currentUser) return null;

    const { password, ...userWithoutPassword } = currentUser;

    const serializedUser: SerializedUser = {
      ...userWithoutPassword,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString(),
    };

    return serializedUser;
  } catch (error) {
    console.error(error);
  }
}
