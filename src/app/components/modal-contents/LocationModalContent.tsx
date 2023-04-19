import { CountrySelector } from "../CountrySelector";
import { Map } from "../Map";
import { Country } from "@/app/hooks/useCountries";
import { ModalContentLayout } from "./ModalContentLayout";

interface LocationModalContentProps {
  location: Country;
  onChange: (value: Country) => void;
}

export const LocationModalContent = ({
  location,
  onChange,
}: LocationModalContentProps) => {
  return (
    <div className="z-5 relative">
      <ModalContentLayout
        title="Where is your place located?"
        subtitle="Help your guests find your place easily"
      >
        <div className={"relative z-20"}>
          <CountrySelector
            value={location}
            onChange={(value) => onChange(value)}
          />
        </div>
        <div className={"relative z-10"}>
          <Map center={location?.latlng} />
        </div>
      </ModalContentLayout>
    </div>
  );
};
