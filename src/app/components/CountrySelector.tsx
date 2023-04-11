"use client";

import Select from "react-select";
import { Country, useCountries } from "../hooks/useCountries";

interface CountrySelectorProps {
  value: Country;
  onChange: (value: Country) => void;
}

export const CountrySelector = ({ value, onChange }: CountrySelectorProps) => {
  const { getCountries } = useCountries();

  return (
    <Select
      classNames={{
        control: () => "p-1",
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#ea580c",
          primary25: "#ffedd5",
          primary50: "#ffedd5",
        },
      })}
      maxMenuHeight={230}
      autoFocus
      menuPlacement="bottom"
      placeholder="Select a country"
      isClearable
      options={getCountries()}
      onChange={(value) => onChange(value as Country)}
      value={value}
      formatOptionLabel={(country) => (
        <div className="flex items-center space-x-2">
          <div>{country.label}</div>
          <div className="w-4">{country.flag}</div>
        </div>
      )}
    />
  );
};
