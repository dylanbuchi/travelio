"use client";

import React, { useCallback, useMemo } from "react";
import { SerializedUser } from "../../models/user.model";
import { useCountries } from "../../hooks/useCountries";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { HeartButton } from "../buttons/HeartButton";
import { Button } from "../buttons/Button";
import { SerializedListing } from "../../models/listing.model";
import { SerializedReservationWithListing } from "@/app/models/reservation.model";

interface ListingCardProps {
  listing: SerializedListing;
  user?: SerializedUser | null;
  reservation?: SerializedReservationWithListing;
  onAction?: (id?: string) => void;
  actionId?: string;
  isDisabled?: boolean;
  actionLabel?: string;
  showHeartButton?: boolean;
}
export const ListingCard = (props: ListingCardProps) => {
  const {
    listing,
    actionId,
    actionLabel,
    isDisabled,
    onAction,
    reservation,
    user,
    showHeartButton = true,
  } = props;

  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(listing.location);
  const category = listing.category ? listing.category : "Other";
  const image = listing.image ? listing.image : "/images/image-placeholder.png";

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      event.stopPropagation();
      onAction?.(actionId);
    },
    [actionId, isDisabled, onAction]
  );

  const price = useMemo(
    () => (reservation ? reservation.totalPrice : listing.price),
    [listing.price, reservation]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) return;

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    const date = `${format(startDate, "PP")} - ${format(endDate, "PP")}`;

    return date;
  }, [reservation]);

  return (
    <div className="group cursor-pointer">
      <div className="flex w-full flex-col gap-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Link href={`listings/${listing.id}`}>
            <Image
              className="transition group-hover:scale-105"
              src={image}
              alt="Listing"
              fill
            />
          </Link>
          <div hidden={!showHeartButton} className="absolute right-3 top-3">
            <HeartButton listingId={listing.id} user={user} />
          </div>
        </div>
        <div className="font-semibold">
          {location?.label}, {location?.region}
        </div>
        <div className="-mt-2 text-sm font-normal text-neutral-600">
          {reservationDate ||
            `${category[0]?.toUpperCase()}${category.slice(1)}`}
        </div>
        <div className="flex items-center gap-1">
          {reservation && <div className="">Total price: </div>}
          <div className="font-semibold">${price}</div>
          {!reservation && <div className=""> a night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            isSmall
            isDisabled={isDisabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
