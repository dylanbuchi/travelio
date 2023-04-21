"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Modal } from "./Modal";
import { searchModalStore } from "@/app/store/modal.store";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { Country } from "@/app/hooks/useCountries";
import queryString from "query-string";
import { formatISO } from "date-fns";
import { ModalContentLayout } from "../modal-contents/ModalContentLayout";
import { LocationModalContent } from "../modal-contents/LocationModalContent";
import { Calendar } from "../Calendar";
import { CounterProps } from "../Counter";
import { InfoModalContent } from "../modal-contents/InfoModalContent";

enum SearchModalPages {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export const SearchModal = () => {
  const { isOpen, closeModal } = searchModalStore();
  const params = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(SearchModalPages.LOCATION);

  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);

  const [location, setLocation] = useState<Country>({} as Country);
  const [dateRange, setDateRange] = useState<Range>(() => ({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  }));

  const onSubmit = useCallback(() => {
    if (page !== SearchModalPages.INFO) return moveToPage("next");

    let query = {};
    if (params) {
      query = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...query,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate)
      updatedQuery.startDate = formatISO(dateRange.startDate);

    if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate);

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setPage(SearchModalPages.LOCATION);
    closeModal();

    router.push(url);
  }, [
    bathroomCount,
    closeModal,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    page,
    params,
    roomCount,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (page === SearchModalPages.INFO) return "Search";
    return "Next";
  }, [page]);

  const secondaryActionLabel = useMemo(() => {
    return page === SearchModalPages.LOCATION ? "" : "Back";
  }, [page]);

  const counterData: CounterProps[] = [
    {
      title: "Guests",
      subtitle: "How many guests?",
      value: guestCount,
      onChange: (value: number) => setGuestCount(value),
    },
    {
      title: "Rooms",
      subtitle: "How many rooms?",
      value: roomCount,
      onChange: (value: number) => setRoomCount(value),
    },
    {
      title: "Bathrooms",
      subtitle: "How many bathrooms?",
      value: bathroomCount,
      onChange: (value: number) => setBathroomCount(value),
    },
  ];

  function moveToPage(direction: "next" | "back") {
    setPage((prev) =>
      direction === "next" ? Math.min(prev + 1, 3) : Math.max(prev - 1, 0)
    );
  }

  const getContent = () => {
    switch (page) {
      case SearchModalPages.LOCATION:
        return (
          <LocationModalContent
            showMap
            title="Where do you want to go?"
            subtitle="Find the best stays"
            location={location}
            onChange={(value) => setLocation(value)}
          />
        );

      case SearchModalPages.DATE:
        return (
          <ModalContentLayout
            title="When do you want to go?"
            subtitle="Select the start and end dates"
          >
            <Calendar
              value={dateRange}
              onChange={(value) => setDateRange(value.selection)}
            />
          </ModalContentLayout>
        );

      case SearchModalPages.INFO:
        return (
          <InfoModalContent
            title="More information"
            subtitle="Add some more details to your search"
            counterData={counterData}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <Modal
      title="Filter your search"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={
        page === SearchModalPages.LOCATION
          ? undefined
          : () => moveToPage("back")
      }
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={onSubmit}
      content={getContent()}
    />
  );
};
