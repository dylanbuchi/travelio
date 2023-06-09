"use client";

import { Logo } from "./Logo";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";
import { SerializedUser } from "@/models/user.model";
import Categories from "./categories/Categories";
import { DarkModeToggle } from "../buttons/DarkModeToggle";

interface NavbarProps {
  user?: SerializedUser | null;
}

export const Navbar = ({ user }: NavbarProps) => {
  return (
    <>
      <header className="fixed z-50 w-full bg-white shadow-sm dark:bg-gray-900">
        <div className="container mx-auto max-w-[158rem] border-b border-gray-200 p-1 dark:border-gray-600 sm:px-2 md:px-5 md:py-2 lg:px-10 xl:px-20">
          <nav className="flex items-center justify-between space-x-1 md:space-x-0">
            <Logo />
            <Search />
            <div className="flex gap-2">
              <DarkModeToggle />
              <UserMenu user={user} />
            </div>
          </nav>
        </div>
        <Categories />
      </header>
    </>
  );
};
