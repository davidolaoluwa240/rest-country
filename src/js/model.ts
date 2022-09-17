// Helpers
import { countryTransformer, getJSON } from "./helper";

// Configs
import { API_URL } from "./config";

// Interfaces
import { Country, CountryTransformer } from "./interfaces/country";

/**
 * Application State
 */
export const state: {
  countries: CountryTransformer[];
  selectedCountry: CountryTransformer | void;
  countryRegions: string[];
  filteredCountries: CountryTransformer[];
  filterTerm: string;
  filterBy: string;
} = {
  countries: [],
  selectedCountry: undefined,
  countryRegions: ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"],
  filteredCountries: [],
  filterTerm: "",
  filterBy: "All",
};

/**
 * Load All Country Data
 */
export const loadCountries = async function (): Promise<void> {
  // 1) If we already have countries data then return early
  if (this.countries.length) return;

  // 2) Send request
  const countries = await getJSON<Country[]>(`${API_URL}/all`);

  // 3) When data is empty, throw error
  if (!countries || !countries.length) throw new Error("No countries data");

  // 4) Transform country data
  const transformedCountries = countries.map(
    (country: Country): CountryTransformer => countryTransformer(country)
  );

  // 5) Update state
  this.countries = transformedCountries;
}.bind(state);

/**
 * Load Single Country Data
 * @param {string} countryName Country to fetch
 */
export const loadCountry = async function (countryName: string): Promise<void> {
  // 1) Send request
  const country = await getJSON<Country[]>(
    `${API_URL}/name/${countryName}?fullText=true`
  );

  // 2) When data is undefined, throw error
  if (!country?.[0])
    throw new Error("Country not found. Please try with a different country");

  // 3) Transform country data
  const transformedCountry = countryTransformer(country[0]);

  // 4) Update state
  this.selectedCountry = transformedCountry;
}.bind(state);

/**
 * Filter Countries
 * @param {string} filterTerm Country name to filter
 * @param {string} filterBy Country region to filter
 */
export const filterCountries = async function (
  filterTerm: string,
  filterBy: string
): Promise<void> {
  // 1) Update state filterTerm and filterBy value
  this.filterBy = filterBy;
  this.filterTerm = filterTerm;

  // 2) If there's no country data then fetch
  if (!this.countries.length) {
    await loadCountries();
  }

  // 3) Start filtering
  this.filteredCountries = this.countries.filter(
    (country: CountryTransformer): boolean =>
      filterBy === "All"
        ? country.countryName.toLowerCase().includes(filterTerm.toLowerCase())
        : country.countryName
            .toLowerCase()
            .includes(filterTerm.toLowerCase()) &&
          country.region.toLowerCase() === filterBy.toLowerCase()
  );

  // 4) Throw error when no result
  if (!this.filteredCountries?.length)
    throw new Error(
      `There's no country with the search criteria "${filterTerm}" ${
        filterBy !== "All" ? `in the specified region "${filterBy}"` : ""
      }`
    );
}.bind(state);
