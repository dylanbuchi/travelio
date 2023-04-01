"use client";

import { BiSearch } from "react-icons/bi";

export const Search = () => {
  return (
    <nav className="cursor-pointer rounded-full border border-gray-200 py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <div className="flex items-center justify-between">
        <h2 className="px-6 text-sm font-semibold">Anywhere</h2>
        <h2 className="hidden flex-1 border-x border-gray-200 px-6 text-center text-sm font-semibold sm:block">
          Any Week
        </h2>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm font-semibold text-gray-600">
          <h2 className="hidden sm:block">Add Guests</h2>
          <button className="rounded-full bg-teal-600 p-2 text-white">
            <BiSearch size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
