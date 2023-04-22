import { getCurrentUser } from "@/services/user.session";
import { NextResponse } from "next/server";

export async function checkUserAuthentication() {
  const user = await getCurrentUser();
  if (!user) throw NextResponse.error();
  return user;
}
