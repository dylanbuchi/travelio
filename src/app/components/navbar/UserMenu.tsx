"use client";

import { APP_NAME } from "@/app/constants/app.constants";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useRef, useState } from "react";
import { UserMenuItem } from "./UserMenuItem";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import { signOut } from "next-auth/react";
import { SerializedUser } from "@/app/models/user.model";
import { loginModalStore, registerModalStore } from "@/app/store/modal.store";

interface UserMenuProps {
  user?: SerializedUser | null;
}
export const UserMenu = ({ user }: UserMenuProps) => {
  const { openModal: openLoginModal } = loginModalStore();
  const { openModal: openRegisterModal } = registerModalStore();

  const [isOpen, setIsOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(userMenuRef, () => setIsOpen(false));

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  const userImage = user?.image ?? "/images/avatar-placeholder.png";
  const userName = user?.name ?? "Guest";

  return (
    <div ref={userMenuRef} className="relative text-sm">
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
          <div className="hidden items-center space-x-2 text-sm md:flex">
            <Avatar src={userImage} />
            <span>{userName}</span>
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-14 w-[40vw] overflow-hidden rounded-xl bg-white shadow-md md:w-[20vw]">
          <nav className="flex cursor-pointer flex-col">
            {user ? (
              <>
                <UserMenuItem label="Trips" onClick={() => {}} />
                <UserMenuItem label="Favorites" onClick={() => {}} />
                <UserMenuItem label="Reservations" onClick={() => {}} />
                <UserMenuItem label="Properties" onClick={() => {}} />

                <UserMenuItem
                  label={`${APP_NAME} my home`}
                  onClick={() => {}}
                />
                <hr />
                <UserMenuItem label="Log out" onClick={signOut} />
              </>
            ) : (
              <>
                <UserMenuItem
                  label="Log in"
                  onClick={() => {
                    setIsOpen(false);
                    openLoginModal();
                  }}
                />
                <UserMenuItem
                  label="Sign up"
                  onClick={() => {
                    setIsOpen(false);
                    openRegisterModal();
                  }}
                />
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
