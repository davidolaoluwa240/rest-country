// Modules
import { it, describe, expect, beforeAll, beforeEach, vi, Mock } from "vitest";
import axiosMock, { AxiosRequestConfig } from "axios";

// Helpers
import {
  countryTransformer,
  numberFormat,
  getJSON,
  catchAsync,
} from "../src/script/helper";

// Interfaces
import { Country, CountryTransformer } from "../src/script/interfaces/country";

// Data
let country: Country;

// Hooks
beforeAll(() => {
  country = {
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
});

// Mocks
vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(
        (
          url: string,
          configs: AxiosRequestConfig
        ): Promise<{ data: Country }> => {
          return Promise.resolve({
            data: country,
          });
        }
      ),
      isAxiosError: vi.fn((err: any): boolean => true),
    },
  };
});

describe("countryTransformer()", () => {
  it("should transform the provided country data to more usable object", () => {
    const transformedValue: CountryTransformer = countryTransformer(country);

    let expectedValue: CountryTransformer = {
      countryName: country.name.common,
      flag: country.flags.png,
      region: country.region,
      population: country.population,
      capital: country.capital,
      borders: country.borders,
      topLevelDomain: country.tld,
      subregion: country.subregion,
      currencies: Object.keys(country.currencies || []),
      languages: Object.values(country.languages || []),
    };

    expect(transformedValue).toEqual(expectedValue);
  });

  it("should format currencies as array of string", () => {
    const transformedValue: CountryTransformer = countryTransformer(country);
    expect(transformedValue.currencies).toEqual(["BGN"]);
  });

  it("should format languages as array of string", () => {
    const transformedValue: CountryTransformer = countryTransformer(country);
    expect(transformedValue.languages).toEqual(["Bulgarian"]);
  });
});

describe("numberFormat()", () => {
  it("should format the specified number to the specified locale", () => {
    const testLocale = "en-US";
    const testNumber = 123223;

    const formattedNumber = numberFormat(testLocale, testNumber);

    expect(formattedNumber).toBe("123,223");
  });

  it("should use the default locale if no locale is provided", () => {
    const testNumber = 123223;

    const formattedNumber = numberFormat(undefined, testNumber);

    expect(formattedNumber).toBe("123,223");
  });
});

describe("getJSON()", () => {
  it("should return any available resolve value", async () => {
    const testUrl = "testUrl";
    const response = await getJSON<Country>(testUrl);
    expect(response).toEqual(country);
  });

  it("should throw an error if status code is 404", async () => {
    // @ts-ignore
    axiosMock.get.mockImplementation(
      (url: string, configs: AxiosRequestConfig) => {
        return Promise.reject({ status: "404" });
      }
    );

    try {
      const testUrl = "testUrl";
      await getJSON<Country>(testUrl);
    } catch (err) {
      expect(err.message).toBe("Could not find the specified country");
    }
  });

  it("should throw an error if status code is 500", async () => {
    // @ts-ignore
    axiosMock.get.mockImplementationOnce(
      (url: string, configs: AxiosRequestConfig) => {
        return Promise.reject({ status: "500" });
      }
    );

    try {
      const testUrl = "testUrl";
      await getJSON<Country>(testUrl);
    } catch (err) {
      expect(err.message).toBe("Something went wrong. Please try again later");
    }
  });

  it("should throw an error for non-axios error", async () => {
    // @ts-ignore
    axiosMock.get.mockImplementationOnce(
      (url: string, configs: AxiosRequestConfig) => {
        return Promise.reject(new Error("test error"));
      }
    );

    // @ts-ignore
    axiosMock.isAxiosError.mockImplementationOnce((err: any): boolean => {
      return true;
    });

    try {
      const testUrl = "testUrl";
      await getJSON<Country>(testUrl);
    } catch (err) {
      expect(err.message).toBe("test error");
    }
  });
});

describe("catchAsync()", () => {
  let callbackPro: Mock<[], Promise<void>>;
  let errCallbackPro: Mock<[message: string], Promise<void>>;

  beforeEach(() => {
    callbackPro = vi.fn(async (...data: any): Promise<void> => undefined);
    errCallbackPro = vi.fn(async (message: string): Promise<void> => undefined);
  });

  it("should return a function", () => {
    const response = catchAsync(callbackPro, errCallbackPro);
    expect(response).toBeTypeOf("function");
  });

  it("should return a promise function", () => {
    const response = catchAsync(callbackPro, errCallbackPro)();
    expect(response).toBeInstanceOf(Promise);
  });

  it("should trigger the callback function provided", async () => {
    await catchAsync(callbackPro, errCallbackPro)();
    expect(callbackPro).toBeCalled();
  });

  it("callback should be called with the provided inputs", async () => {
    const inputs = ["nigeria", "europe"];
    await catchAsync(callbackPro, errCallbackPro)(...inputs);
    expect(callbackPro).toBeCalledWith(...inputs);
  });

  it("should trigger the error callback function when an error occur", async () => {
    const errorMessage = "test error";
    callbackPro.mockImplementationOnce(async (): Promise<void> => {
      throw new Error(errorMessage);
    });
    await catchAsync(callbackPro, errCallbackPro)();
    expect(errCallbackPro).toBeCalled();
  });

  it("error callback function should be called with the provided error message", async () => {
    const errorMessage = "test error";
    callbackPro.mockImplementationOnce(async (): Promise<void> => {
      throw new Error(errorMessage);
    });
    await catchAsync(callbackPro, errCallbackPro)();
    expect(errCallbackPro).toBeCalledWith(errorMessage);
  });
});
