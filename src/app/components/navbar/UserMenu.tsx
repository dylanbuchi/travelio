"use client";

import { APP_NAME } from "@/app/constants/app.constants";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useState } from "react";
import { UserMenuItem } from "./UserMenuItem";
import { useRegisterModal } from "../../hooks/useRegisterModal";

export const UserMenu = () => {
  const registerModal = useRegisterModal();

  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative text-sm">
      <div className="flex items-center gap-3">
        <button
          aria-label=""
          className="hidden cursor-pointer rounded-full px-4 py-3 font-semibold transition hover:bg-neutral-100 md:block"
        >
          {`${APP_NAME} your home`}
        </button>
        <button
          aria-label="Toggle User Menu"
          className="flex cursor-pointer items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-4 md:py-2"
          onClick={toggleMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-[40vw] overflow-hidden rounded-xl bg-white shadow-md md:w-[20vw]">
          <nav className="flex cursor-pointer flex-col">
            <>
              <UserMenuItem label="Sign up" onClick={registerModal.onOpen} />
              <UserMenuItem label="Log in" onClick={registerModal.onOpen} />
            </>
          </nav>
        </div>
      )}
    </div>
  );
};
