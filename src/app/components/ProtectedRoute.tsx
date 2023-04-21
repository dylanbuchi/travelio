"use client";

import { PropsWithChildren } from "react";

import { SerializedUser } from "../models/user.model";
import { NoResults } from "../components/NoResults";

interface ProtectedRouteProps extends PropsWithChildren {
  currentUser: SerializedUser | null | undefined;
}

export const ProtectedRoute = ({
  currentUser,
  children,
}: ProtectedRouteProps) => {
  if (!currentUser) {
    return (
      <NoResults
        title="Unauthorized"
        subtitle="You are not authorized to view this page. Please login to continue."
      />
    );
  }

  return <>{children}</>;
};
