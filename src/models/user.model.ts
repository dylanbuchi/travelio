import { User } from "@prisma/client";

type RemovedUserFields =
  | "createdAt"
  | "emailVerified"
  | "updatedAt"
  | "password";

export type SerializedUser = Omit<User, RemovedUserFields> & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string;
};
