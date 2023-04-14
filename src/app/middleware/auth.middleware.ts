import { getCurrentUser } from "@/app/services/user.session";

export async function checkUserAuthentication() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}
