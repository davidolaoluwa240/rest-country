// Helpers
import { getJSON, catchAsyncThrow } from "./helper";

// Configs
import { API_URL } from "./config";

/**
 * Application State
 */
export const state = {
  countries: [],
  selectedCountry: {},
  countryRegions: ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"],
  filteredCountries: [],
  filterTerm: "",
  filterBy: "All",
};

/**
 * Load All Country Data
 * @returns {undefined} void
 * @this {Object} state
 */
export const loadCountries = catchAsyncThrow(
  async function () {
    // 1) If we already have countries data then return early
    if (this.countries?.length) return;

    // 2) Send Request
    const data = await getJSON(`${API_URL}all`);

    // 3) When data is empty, throw error
    if (!data?.length) throw new Error("No countries data");

    // 4) Update State
    this.countries = data;
  }.bind(state)
);

/**
 * Load Single Country Data
 * @returns {undefined} void
 * @this {Object} state
 */
export const loadCountry = catchAsyncThrow(
  async function (country) {
    // 1) Send Request
    const [data] = await getJSON(`${API_URL}name/${country}?fullText=true`);

    // 2) When data is undefined, throw error
    if (!data)
      throw new Error("Country not found. Please try with a different country");

    // 3) Update State
    this.selectedCountry = data;
  }.bind(state)
);

/**
 * Filter Countries Data
 * @param {string} filterTerm Country name to filter
 * @param {string} filterBy Country region to filter
 * @returns {undefined} void
 * @this {Object} state
 */
export const filterCountries = catchAsyncThrow(
  async function (filterTerm, filterBy) {
    // 1) Update State filterTerm and filterBy in state
    this.filterBy = filterBy;
    this.filterTerm = filterTerm;

    // 2) If there's no country data then fetch
    if (!this.countries?.length) {
      await loadCountries();
    }

    // 3) Start Filtering
    this.filteredCountries = this.countries.filter((country) =>
      filterBy === "All"
        ? country.name.common.toLowerCase().includes(filterTerm.toLowerCase())
        : country.name.common
            .toLowerCase()
            .includes(filterTerm.toLowerCase()) &&
          country.region.toLowerCase() === filterBy.toLowerCase()
    );

    // 4) Throw Error When No Result
    if (!this.filteredCountries?.length)
      throw new Error(
        `There's no country with the search criteria "${filterTerm}" ${
          filterBy !== "All" ? `in the specified region "${filterBy}"` : ""
        }`
      );
  }.bind(state)
);
