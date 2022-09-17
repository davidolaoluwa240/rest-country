// Configs
import { FETCH_TIMEOUT_SECS } from "./config";

// Interfaces
import { CountryTransformer, Country } from "./interfaces/country";
import { Callback, ErrorCallback } from "./interfaces/callback";

/**
 * Custom Timeout Function
 * @param {number} sec Seconds in which the timeout promise should be rejected
 */
const timeout = function (sec: number): Promise<Error> {
  return new Promise(function (_, reject) {
    setTimeout(
      reject.bind(null, new Error("Request took too long. Please try again")),
      sec * 1000
    );
  });
};

/**
 * Catch Async Error And Handle Error By Calling the ErrorCallback
 * @param {Function} cb Callback function
 * @param {Function} errCb Error callback function
 */
const catchAsync = function (
  cb: Callback,
  errCb: ErrorCallback
): (...data: any[]) => Promise<void> {
  return async function (...data: any[]): Promise<void> {
    try {
      await cb(...data);
    } catch (err) {
      errCb(err.message);
    }
  };
};

/**
 * Custom Fetch Function
 * @param {string} url URL to make request to
 */
const getJSON = async function <T>(url: string): Promise<T> {
  const res = await Promise.race([fetch(url), timeout(FETCH_TIMEOUT_SECS)]);
  if (res instanceof Response) {
    const data = await res.json();
    if (res.status === 404)
      throw new Error("Could not find the specified country");
    if (res.status === 500)
      throw new Error("Something went wrong. Please try again later");
    return data;
  }
  throw null;
};

/**
 * Format Number Based On A Locale
 * @param {string} locale locale (eg. en-US)
 * @param {number} value Number to format
 * @example
 * numberFormat("en-Us", 100000)
 */
const numberFormat = function (
  locale: string = "en-US",
  value: number
): string {
  return new Intl.NumberFormat(locale).format(value);
};

/**
 * Transform Country Data
 * @param {Country} country Country data
 */
const countryTransformer = function (country: Country): CountryTransformer {
  return {
    countryName: country.name.common,
    flag: country.flags.png,
    region: country.region,
    population: +country.population,
    capital: country.capital,
    borders: country.borders,
    topLevelDomain: country.tld,
    subregion: country.subregion,
    currencies: Object.keys(country.currencies || []),
    languages: Object.values(country.languages || []),
  };
};

export { getJSON, catchAsync, numberFormat, countryTransformer };
