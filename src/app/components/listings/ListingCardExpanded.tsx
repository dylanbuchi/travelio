"use client";

import { SerializedListing } from "@/app/models/listing.model";
import { SerializedUser } from "@/app/models/user.model";
import { Reservation } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "../navbar/categories/constants";
import { ListingHeader } from "./ListingHeader";
import { ListingInfo } from "./ListingInfo";
import { loginModalStore } from "@/app/store/modal.store";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import { SerializedReservationWithListing } from "@/app/models/reservation.model";

interface ListingCardExpandedProps {
  listing: SerializedListing;
  user?: SerializedUser | null;
  currentUser?: SerializedUser | null;
  reservations?: SerializedReservationWithListing[];
}

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

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
        router.refresh();
      })
      .catch((error) => {
        console.log(error);

        toast.error(error?.message);
      })
      .finally(() => setIsLoading(false));
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    openModal,
    router,
    totalPrice,
  ]);

  const listingCategory = useMemo(() => {
    return CATEGORIES.find((item) => item.id === category.toLowerCase());
  }, [category]);

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
        isDisabled={isLoading}
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
