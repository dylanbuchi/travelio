import { serializeUser } from "../helpers/serializers.helper";

interface UserParams {
  userId: string;
}

export async function getUserById(params: UserParams) {
  try {
    const user = await prismaClient?.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!user) return;

    const serializedUser = serializeUser(user);

    return serializedUser;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
