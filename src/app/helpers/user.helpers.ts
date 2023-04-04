import { User } from "@prisma/client";

interface UserDTO {
  email: string;
  name: string;
}

export function toUserDTO(user: Partial<User>): UserDTO {
  return {
    email: user.email?.trim() ?? "",
    name: user.name?.trim() ?? "",
  };
}
