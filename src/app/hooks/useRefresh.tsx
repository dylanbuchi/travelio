import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useRefreshPage = (deps: unknown[]) => {
  const router = useRouter();
  useEffect(
    () => {
      router.refresh();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps, router] : [router]
  );
};
