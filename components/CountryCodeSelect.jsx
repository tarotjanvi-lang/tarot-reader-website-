"use client";

import { useEffect, useState } from "react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

export default function CountryCodeSelect({ value, onChange }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Build display names only in the browser. Intl.DisplayNames can return
    // different regional names in Node vs the browser, which causes hydration
    // mismatches such as "Falkland Islands" vs "Falkland Islands (Islas Malvinas)".
    const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

    const nextCountries = getCountries()
      .map((country) => ({
        country,
        name: countryNames.of(country) || country,
        callingCode: getCountryCallingCode(country),
      }))
      .sort((first, second) => first.name.localeCompare(second.name));

    setCountries(nextCountries);
  }, []);

  return (
    <select
      aria-label="Country calling code"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {countries.map(({ country, name, callingCode }) => (
        <option key={country} value={country}>
          +{callingCode} {name}
        </option>
      ))}
    </select>
  );
}
