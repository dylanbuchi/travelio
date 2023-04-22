import bcrypt from "bcrypt";
import { prismaClient } from "@/database/prisma-db";
import { NextResponse } from "next/server";
import { serializeUser } from "@/helpers/serializers.helper";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    return NextResponse.json(serializeUser(user));
  } catch (error) {
    return NextResponse.error();
  }
}
