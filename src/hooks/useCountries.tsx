import countries from "world-countries";

export interface Country {
  label: string;
  value: string;
  flag: string;
  region: string;
  latlng: [number, number];
}

const formattedCountries: Country[] = countries.map((item) => ({
  label: item.name.common,
  value: item.cca2,
  flag: item.flag,
  region: item.region,
  latlng: item.latlng,
}));

export const useCountries = () => {
  function getCountries() {
    return formattedCountries;
  }

  function getCountryByValue(value: string) {
    return formattedCountries.find(
      (item) => item.value.toLowerCase() === value?.toLowerCase()
    );
  }

  return { getCountries, getCountryByValue };
};
