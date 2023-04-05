import { User } from "@prisma/client";

type RemovedUserFields =
  | "createdAt"
  | "emailVerifiedAt"
  | "updatedAt"
  | "password";

export type SerializedUser = Omit<User, RemovedUserFields> & {
  createdAt: string;
  updatedAt: string;
  emailVerifiedAt?: string;
};
