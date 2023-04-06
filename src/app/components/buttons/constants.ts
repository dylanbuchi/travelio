import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

export const SOCIAL_BUTTONS = [
  {
    id: 1,
    icon: FcGoogle,
    label: "Continue with Google",
    onClick: () => signIn("google"),
  },

  {
    id: 2,
    icon: AiFillGithub,
    label: "Continue with GitHub",
    onClick: () => signIn("github"),
  },
];
