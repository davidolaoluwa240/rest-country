// Configs
import { FETCH_TIMEOUT_SECS } from "./config";

/**
 * Custom Timeout Function
 * @param {number} sec Seconds in which the timeout promise should be rejected
 * @returns {Promise} Promise
 */
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(
      reject.bind(null, new Error("Request took too long. Please try again")),
      sec * 1000
    );
  });
};

/**
 * Catch Async Error and Re-throw The Error
 * @param {Function} cb Async function to be called
 * @returns {function} Async function
 */
const catchAsyncThrow = function (cb) {
  return async function (...data) {
    try {
      return await cb(...data);
    } catch (err) {
      throw err;
    }
  };
};

/**
 * Catch Async Error
 * @param {Function} cb Async function to be called
 * @param {Function} errCb Error function to be called when an error occur
 * @returns {Function} Async function
 */
const catchAsync = function (cb, errCb) {
  return async function (...data) {
    try {
      return await cb(...data);
    } catch (err) {
      errCb(err.message);
    }
  };
};

/**
 * Custom Fetch function
 */
const getJSON = catchAsyncThrow(async function (url) {
  const res = await Promise.race([fetch(url), timeout(FETCH_TIMEOUT_SECS)]);
  const data = await res.json();
  if (res.status === 404)
    throw new Error("Could not find the specified country");
  if (res.status === 500)
    throw new Error("Something went wrong. Please try again later");
  return data;
});

/**
 * Format number based on a locale
 * @param {string} locale Country locale (eg. en-US)
 * @param {number} number Number to format
 * @returns {string} Formatted number based on the locale
 * @example
 * numberFormat("en-Us", 100000)
 */
const numberFormat = function (locale = "en-US", number) {
  return new Intl.NumberFormat(locale).format(number);
};

export { getJSON, catchAsync, catchAsyncThrow, numberFormat };
