"use client";

import { Header } from "./Header";
import { Button } from "./buttons/Button";
import Link from "next/link";

interface NoResultsProps {
  title?: string;
  subtitle?: string;
  showResetButton?: boolean;
}

export const NoResults = ({
  title = "No results",
  subtitle = "Try changing or removing your filters",
  showResetButton,
}: NoResultsProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <Header alignCenter title={title} subTitle={subtitle} />
      {showResetButton && (
        <Link href={"/"} className="m-3">
          <Button
            classes="px-4 py-2 font-semibold"
            isSmall
            label="Remove all filters"
          />
        </Link>
      )}
    </div>
  );
};
