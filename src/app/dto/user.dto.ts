import { User } from "@prisma/client";

export interface UserDTO {
  id?: string;
  name: string;
  email: string;
}

export function convertUserToDTO(user: Partial<User>): UserDTO {
  return {
    id: user.email?.trim() || "",
    email: user.email?.trim() || "",
    name: user.name?.trim() || "",
  };
}
