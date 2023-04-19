"use client";

import { Range } from "react-date-range";
import { Calendar } from "../Calendar";
import { SerializedUser } from "@/app/models/user.model";
import clsx from "clsx";
import { useState } from "react";
import { loginModalStore } from "@/app/store/modal.store";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { Button } from "../buttons/Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDateRange: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  isDisabled: boolean;
  disabledDates: Date[];
  currentUser?: SerializedUser | null;
}

const ListingReservation = (props: ListingReservationProps) => {
  const {
    price,
    onChangeDateRange,
    dateRange,
    disabledDates,
    totalPrice,
    currentUser,
    isDisabled,
    onSubmit,
  } = props;
  const [showCalendar, setShowCalendar] = useState(false);
  const { openModal } = loginModalStore();

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (currentUser) {
      return setShowCalendar((prev) => !prev);
    }
    return openModal();
  };

  return (
    <div className="w-full cursor-pointer overflow-hidden rounded-xl border border-neutral-500 transition">
      <div className="flex flex-col items-center">
        <div
          onClick={(event) => handleOnClick(event)}
          className="relative w-full border-b border-neutral-500 p-2 text-center font-semibold hover:bg-neutral-100 hover:opacity-70"
        >
          ${price} <span className="font-normal"> per night</span>
          {!showCalendar && (
            <BsFillArrowDownCircleFill className="absolute right-2 top-[0.70rem] text-xl transition" />
          )}
        </div>
        <div hidden={!showCalendar} className={clsx("w-full")}>
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDateRange(value.selection)}
          />
          <div className="flex w-full cursor-default items-center justify-between border-t border-neutral-500 p-2 px-4">
            <div>Total price:</div>
            <div className="font-semibold">${totalPrice}</div>
          </div>
          <div className="border-t border-neutral-500 p-5">
            <Button
              label="Reserve"
              isDisabled={isDisabled}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
