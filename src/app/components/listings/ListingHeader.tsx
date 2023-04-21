"use client";

import Image from "next/image";
import { useCountries } from "@/app/hooks/useCountries";
import { SerializedUser } from "@/app/models/user.model";
import { Header } from "../Header";
import { HeartButton } from "../buttons/HeartButton";

interface ListingHeaderProps {
  id: string;
  title: string;
  image: string;
  location: string;
  currentUser?: SerializedUser | null;
}

export const ListingHeader = ({
  id,
  title,
  image,
  location,
  currentUser,
}: ListingHeaderProps) => {
  const { getCountryByValue } = useCountries();
  const locationObject = getCountryByValue(location);

  return (
    <>
      <Header
        title={title}
        subTitle={`${locationObject?.label}, ${locationObject?.region}`}
      />
      <div className="relative h-[60vh] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={"Listing"}
          className="w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <div className="absolute right-2 top-2">
          <HeartButton listingId={id} user={currentUser} />
        </div>
      </div>
    </>
  );
};
