import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCampingTent,
  GiCastle,
  GiCaveEntrance,
  GiDesert,
  GiWindmill,
} from "react-icons/gi";

import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { IconType } from "react-icons";

export type Category = {
  id: string;
  label: string;
  icon: IconType;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "beach",
    label: "Beach",
    icon: TbBeach,
    description: "This property is closed to the beach",
  },
  {
    id: "windmills",
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    id: "modern",
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is a modern property",
  },
  {
    id: "country-side",
    label: "Country Side",
    icon: TbMountain,
    description: "This property is in the country side",
  },
  {
    id: "pools",
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    id: "lake",
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake",
  },
  {
    id: "skiing",
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is near skiing activities",
  },
  {
    id: "castle",
    label: "Castle",
    icon: GiCastle,
    description: "This property is near a castle",
  },
  {
    id: "camping",
    label: "Camping",
    icon: GiCampingTent,
    description: "This property is near camping activities",
  },
  {
    id: "arctic",
    label: "Arctic",
    icon: BsSnow,
    description: "This property is near camping activities",
  },
  {
    id: "caves",
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is near caves",
  },
  {
    id: "desert",
    label: "Desert",
    icon: GiDesert,
    description: "This property is near deserts",
  },
  {
    id: "barns",
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn",
  },

  {
    id: "luxe",
    label: "Luxe",
    icon: IoDiamond,
    description: "This is a luxurious property",
  },
];
