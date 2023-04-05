import bcrypt from "bcrypt";
import { prismaClient } from "@/app/database/prisma-db";
import { NextResponse } from "next/server";
import { convertUserToDTO } from "@/app/dto/user.dto";

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
    return NextResponse.json(convertUserToDTO(user));
  } catch (error) {
    return NextResponse.error();
  }
}
