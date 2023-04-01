"use client";

import { Logo } from "./Logo";
import { Search } from "./Search";
import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  return (
    <header className="fixed z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto max-w-[158rem] border-b border-gray-200 p-1 sm:px-2 md:px-5 md:py-2 lg:px-10 xl:px-20">
        <nav className="flex items-center justify-between space-x-1 md:space-x-0">
          <Logo />
          <Search />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};
