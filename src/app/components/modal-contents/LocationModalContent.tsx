import { CountrySelector } from "../CountrySelector";
import { Map } from "../Map";
import { Country } from "@/app/hooks/useCountries";
import { ModalContentLayout } from "./ModalContentLayout";

interface LocationModalContentProps {
  location: Country;
  onChange: (value: Country) => void;
  title?: string;
  subtitle?: string;
  showMap?: boolean;
}

export const LocationModalContent = ({
  location,
  onChange,
  title = "Where is your place located?",
  subtitle = "Help your guests find your place easily",
  showMap = false,
}: LocationModalContentProps) => {
  return (
    <div className="z-5 relative">
      <ModalContentLayout title={title} subtitle={subtitle}>
        <div className={"relative z-20"}>
          <CountrySelector
            value={location}
            onChange={(value) => onChange(value)}
          />
        </div>
        {showMap && (
          <div className={"relative z-10"}>
            <Map center={location?.latlng} />
          </div>
        )}
      </ModalContentLayout>
    </div>
  );
};
