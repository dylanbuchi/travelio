import dynamic from "next/dynamic";

export const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
