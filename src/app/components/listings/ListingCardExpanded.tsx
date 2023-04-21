"use client";

import { SerializedListing } from "@/app/models/listing.model";
import { SerializedUser } from "@/app/models/user.model";
import { useCallback, useMemo, useState } from "react";
import { CATEGORIES } from "../navbar/categories/constants";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";
import { loginModalStore } from "@/app/store/modal.store";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ListingReservation } from "./ListingReservation";
import { Range } from "react-date-range";
import { SerializedReservationWithListing } from "@/app/models/reservation.model";

interface ListingCardExpandedProps {
  listing: SerializedListing;
  user?: SerializedUser | null;
  currentUser?: SerializedUser | null;
  reservations?: SerializedReservationWithListing[];
}

const getTotalPrice = (dateRange: Range, listingPrice: number) => {
  const { startDate, endDate } = dateRange;

  if (startDate && endDate) {
    const dayCount = differenceInCalendarDays(endDate, startDate) + 1;

    if (dayCount && listingPrice) {
      return listingPrice * dayCount;
    } else {
      return listingPrice;
    }
  }

  return listingPrice;
};

export const ListingCardExpanded = ({
  listing,
  user,
  reservations = [],
  currentUser,
}: ListingCardExpandedProps) => {
  const {
    userId,
    price,
    image,
    id,
    title,
    createdAt,
    location,
    category,
    ...listingInfo
  } = listing;

  const [isLoading, setIsLoading] = useState(false);

  const disabledDates = useMemo(() => {
    const dates: Date[] = [];

    for (const reservation of reservations) {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates.push(...range);
    }
    return dates;
  }, [reservations]);

  const initialDateRange: Range = useMemo(() => {
    return {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
  }, []);

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const router = useRouter();

  const { openModal } = loginModalStore();

  const totalPrice = getTotalPrice(dateRange, listing.price);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return openModal();

    setIsLoading(true);

    const dataToSend = {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id,
    };

    axios
      .post("/api/reservations", dataToSend)
      .then(() => {
        toast.success("Reservation created successfully");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => setIsLoading(false));
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    initialDateRange,
    listing?.id,
    openModal,
    router,
    totalPrice,
  ]);

  const dateIsInDisabled = useMemo(() => {
    if (!disabledDates) return false;

    for (const date of disabledDates) {
      if (
        dateRange?.startDate?.getFullYear() === date.getFullYear() &&
        dateRange?.startDate?.getMonth() === date.getMonth() &&
        dateRange?.startDate?.getDate() === date.getDate()
      ) {
        return true;
      }
    }

    return false;
  }, [dateRange, disabledDates]);

  const listingCategory = useMemo(() => {
    return CATEGORIES.find((item) => item.id === category.toLowerCase());
  }, [category]);

  return (
    <div className="flex w-full flex-col gap-4 p-5 sm:w-[50%] sm:p-0">
      <ListingHeader
        currentUser={currentUser}
        id={id}
        image={image}
        title={title}
        location={location}
      />

      <ListingReservation
        currentUser={currentUser}
        price={listing.price}
        totalPrice={totalPrice}
        onChangeDateRange={(value) => setDateRange(value)}
        dateRange={dateRange}
        onSubmit={onCreateReservation}
        isDisabled={isLoading || dateIsInDisabled}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-7">
        <ListingInfo
          user={user}
          category={listingCategory}
          location={location}
          {...listingInfo}
        />
      </div>
    </div>
  );
};
