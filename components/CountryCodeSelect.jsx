import { getCountries, getCountryCallingCode } from "libphonenumber-js";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries()
  .map((country) => ({
    country,
    name: countryNames.of(country) || country,
    callingCode: getCountryCallingCode(country),
  }))
  .sort((first, second) => first.name.localeCompare(second.name));

export default function CountryCodeSelect({ value, onChange }) {
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