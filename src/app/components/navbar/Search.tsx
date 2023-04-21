"use client";

import { BiSearch } from "react-icons/bi";
import { SEARCH_CONSTANTS } from "./constants";
import { searchModalStore } from "@/app/store/modal.store";
import { useSearchParams } from "next/navigation";
import { useCountries } from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";

export const Search = () => {
  const { openModal } = searchModalStore();
  const { getCountryByValue } = useCountries();

  const searchParams = useSearchParams();

  const location = searchParams?.get("location");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");

  const guestCount = searchParams?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (location) return getCountryByValue(location)?.label;
    return SEARCH_CONSTANTS.names.anywhere;
  }, [getCountryByValue, location]);

  const stayDuration = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      return differenceInDays(end, start) + 1;
    }
    return SEARCH_CONSTANTS.names.anyWeek;
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guest${parseInt(guestCount) > 1 ? "s" : ""}`;
    }
    return SEARCH_CONSTANTS.names.addGuests;
  }, [guestCount]);

  return (
    <nav
      onClick={openModal}
      className="cursor-pointer rounded-full border border-gray-200 py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
      <div className="flex items-center justify-between">
        <h2 className="px-6 text-sm font-semibold">{locationLabel}</h2>
        <h2 className="hidden flex-1 border-x border-gray-200 px-6 text-center text-sm font-semibold sm:block">
          {typeof stayDuration === "number"
            ? `${stayDuration} day${stayDuration > 1 ? "s" : ""}`
            : `${stayDuration}`}
        </h2>
        <div className="flex items-center gap-3 pl-6 pr-2 text-sm font-semibold text-gray-600">
          <h2 className="hidden sm:block">{guestLabel}</h2>
          <button className="rounded-full bg-teal-600 p-2 text-white">
            <BiSearch size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
