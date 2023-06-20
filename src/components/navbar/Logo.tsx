"use client";

import { APP_NAME } from "@/constants/app.constants";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center">
      <Image
        src={"/images/logo.jpg"}
        title={`${APP_NAME}-logo`}
        alt={`${APP_NAME}-logo`}
        className="-ml-2 hidden cursor-pointer xs:block"
        height={55}
        width={55}
      />
      <h1 className="text-lg font-bold dark:ml-[1rem] xs:-ml-2">{APP_NAME}</h1>
    </Link>
  );
};
