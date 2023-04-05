export interface UserDTO {
  id?: string;
  name: string;
  email: string;
}

export function convertUserToDTO(user: Partial<UserDTO>): UserDTO {
  return {
    id: user.email?.trim() || "",
    email: user.email?.trim() || "",
    name: user.name?.trim() || "",
  };
}
