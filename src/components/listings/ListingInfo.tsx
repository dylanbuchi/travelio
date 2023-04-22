"use client";

import { SerializedUser } from "@/models/user.model";
import { Category } from "../navbar/categories/constants";
import { useCountries } from "@/hooks/useCountries";
import { Avatar } from "../Avatar";
import ListingCategory from "./ListingCategory";
import { Map } from "../Map";

interface ListingInfoProps {
  user?: SerializedUser | null;
  category?: Category;
  description: string;
  location: string;
  bathroomCount: number;
  guestCount: number;
  roomCount: number;
}
export const ListingInfo = (props: ListingInfoProps) => {
  const { user, category, ...listingInfo } = props;

  const { getCountryByValue } = useCountries();
  const mapCoords = getCountryByValue(listingInfo.location)?.latlng;

  function formatText(count: number, singular: string, plural: string) {
    return `${count} ${count > 1 ? plural : singular}`;
  }

  function formatUserName(name?: string | null) {
    if (name == null || !name) return "User";
    if (name.includes(" ")) {
      return `${name.split(" ")[0]} ${name.split(" ")[1][0].toUpperCase()}.`;
    }
    return `${name}`;
  }

  return (
    <div className="col-span-8 flex flex-col gap-4 text-xs sm:text-base">
      <div className={"flex justify-between"}>
        <div>
          {category && (
            <ListingCategory
              label={category.label}
              description={category.description}
              icon={category.icon}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-end gap-2 font-semibold">
            <div> {`Hosted by ${formatUserName(user?.name)}`}</div>
            <Avatar
              src={user?.image ?? undefined}
              alt="Owner-profile-pic"
              size={25}
            />
          </div>
          <div className="flex items-center gap-2 whitespace-pre font-light">
            <div>{formatText(listingInfo.guestCount, "guest", "guests")}</div>
            <div>{formatText(listingInfo.roomCount, "room", "rooms")}</div>
            <div>
              {formatText(listingInfo.bathroomCount, "bathroom", "bathrooms")}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div>{listingInfo.description}</div>
      <hr />
      <div className={"mb-2 h-full sm:mb-10"}>
        <Map scrollWheelZoom center={mapCoords} />
      </div>
    </div>
  );
};
