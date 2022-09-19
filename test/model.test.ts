// Modules
import { it, describe, expect, vi, beforeAll, beforeEach } from "vitest";

// Helpers
import * as Helpers from "../src/script/helper";

// Models
import {
  filterCountries,
  loadCountries,
  loadCountry,
} from "../src/script/model";

// Interfaces
import { CountryTransformer, Country } from "../src/script/interfaces/country";

// Data
let countrySample: Country;
let transformedCountrySample: CountryTransformer;
let stateSample: {
  countries: CountryTransformer[];
  selectedCountry: CountryTransformer | void;
  countryRegions: string[];
  filteredCountries: CountryTransformer[];
  filterTerm: string;
  filterBy: string;
};
const numberOfCountryToGenerate = 5;

// Hooks
beforeAll(() => {
  countrySample = {
    name: {
      common: "Bulgaria",
      official: "Republic of Bulgaria",
    },
    tld: [".bg"],
    currencies: {
      BGN: {
        name: "Bulgarian lev",
        symbol: "лв",
      },
    },
    capital: ["Sofia"],
    region: "Europe",
    subregion: "Southeast Europe",
    languages: {
      bul: "Bulgarian",
    },
    borders: ["GRC", "MKD", "ROU", "SRB", "TUR"],
    population: 6927288,
    flags: {
      png: "https://flagcdn.com/w320/bg.png",
      svg: "https://flagcdn.com/bg.svg",
    },
  };

  transformedCountrySample = {
    countryName: "Bulgaria",
    flag: "https://flagcdn.com/w320/bg.png",
    region: "Europe",
    population: 6927288,
    capital: ["Sofia"],
    borders: ["GRC", "MKD", "ROU", "SRB", "TUR"],
    topLevelDomain: [".bg"],
    subregion: "Southeast Europe",
    currencies: ["BGN"],
    languages: ["Bulgarian"],
  };
});

// Mocks
vi.spyOn(Helpers, "getJSON").mockImplementation(
  vi.fn(async (url: string) => {
    return Array.from(
      { length: numberOfCountryToGenerate },
      () => countrySample
    );
  })
);

describe("loadCountries()", () => {
  beforeEach(() => {
    stateSample = {
      countries: [],
      selectedCountry: undefined,
      countryRegions: [
        "All",
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
      ],
      filteredCountries: [],
      filterTerm: "",
      filterBy: "All",
    };
  });

  it("should set the countries state property", async () => {
    await loadCountries.call(stateSample);
    expect(stateSample.countries).toHaveLength(numberOfCountryToGenerate);
  });

  it("should throw an error when their's no countries returned from the getJSON function", async () => {
    // @ts-ignore
    Helpers.getJSON.mockImplementationOnce(async (url: string) => []);
    try {
      await loadCountries.call(stateSample);
    } catch (err) {
      expect(err.message).toBe("No countries data");
    }
  });

  it("countries property in state must be a transformed countries data", async () => {
    await loadCountries.call(stateSample);
    expect(stateSample.countries[0]).toEqual(transformedCountrySample);
  });

  it("should return a promise in which it resolved value is undefined", async () => {
    const result = await loadCountries.call(stateSample);
    expect(result).toBeUndefined();
  });

  it("should not refetch countries data if we already have countries data in state", async () => {
    stateSample = { ...stateSample, countries: [transformedCountrySample] };
    await loadCountries.call(stateSample);
    expect(stateSample.countries).toHaveLength(1);
  });
});

describe("loadCountry()", () => {
  beforeEach(() => {
    stateSample = {
      countries: [],
      selectedCountry: undefined,
      countryRegions: [
        "All",
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
      ],
      filteredCountries: [],
      filterTerm: "",
      filterBy: "All",
    };
  });

  it("should set the selectedCountry property in state", async () => {
    await loadCountry.call(stateSample, "Nigeria");
    expect(stateSample.selectedCountry).toBeDefined();
  });

  it("should throw an error if no country is found", async () => {
    // @ts-ignore
    Helpers.getJSON.mockImplementationOnce(async (url: string) => []);
    try {
      await loadCountry("Nigeria");
    } catch (err) {
      expect(err.message).toBe(
        "Country not found. Please try with a different country"
      );
    }
  });

  it("selectedCountry state must be a transformed country object", async () => {
    await loadCountry.call(stateSample, "Nigeria");
    expect(stateSample.selectedCountry).toEqual(transformedCountrySample);
  });

  it("should return a promise in which the resolved value is undefined", async () => {
    const result = await loadCountry.call(stateSample, "Nigeria");
    expect(result).toBeUndefined();
  });
});

describe("filterCountries()", () => {
  beforeEach(() => {
    stateSample = {
      countries: [],
      selectedCountry: undefined,
      countryRegions: [
        "All",
        "Africa",
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
      ],
      filteredCountries: [],
      filterTerm: "",
      filterBy: "All",
    };
  });

  it("should set the filteredCountries property in state", async () => {
    const filterBy = "All";
    const filterTerm = "";

    await filterCountries.call(stateSample, filterTerm, filterBy);

    expect(stateSample.filteredCountries).toHaveLength(
      numberOfCountryToGenerate
    );
  });

  it("should return a promise in which it resolves value is undefined", async () => {
    const filterBy = "All";
    const filterTerm = "";

    const result = await filterCountries.call(
      stateSample,
      filterTerm,
      filterBy
    );

    expect(result).toBeUndefined();
  });

  it("should throw an error if filteredCountries is an empty array", async () => {
    const filterBy = "All";
    const filterTerm = "Turkey";

    try {
      await filterCountries.call(stateSample, filterTerm, filterBy);
    } catch (err) {
      expect(err.message).toBe(
        `There's no country with the search criteria "${filterTerm}" ${
          filterBy !== "All" ? `in the specified region "${filterBy}"` : ""
        }`
      );
    }
  });

  it("should correctly set the filterBy value in state", async () => {
    const filterBy = "All";
    const filterTerm = "Bulgaria";

    await filterCountries.call(stateSample, filterTerm, filterBy);

    expect(stateSample.filterBy).toBe(filterBy);
  });

  it("should correctly set the filterTerm value in state", async () => {
    const filterBy = "All";
    const filterTerm = "Bulgaria";

    await filterCountries.call(stateSample, filterTerm, filterBy);

    expect(stateSample.filterTerm).toBe(filterTerm);
  });

  it("should work using different word cases for the filterTerm", async () => {
    const filterBy = "All";
    const filterTerm = "Bulgaria";
    const filterTerm2 = "bulgaria";
    const filterTerm3 = "BULGARIA";
    const filterTerm4 = "BUlGaRIA";
    const filterTerm5 = "BUlGaria";

    await filterCountries.call(stateSample, filterTerm, filterBy);
    await filterCountries.call(stateSample, filterTerm2, filterBy);
    await filterCountries.call(stateSample, filterTerm3, filterBy);
    await filterCountries.call(stateSample, filterTerm4, filterBy);
    await filterCountries.call(stateSample, filterTerm5, filterBy);

    expect(stateSample.filteredCountries).toHaveLength(
      numberOfCountryToGenerate
    );
  });
});
