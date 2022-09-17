// Transformed Country Interface
export interface CountryTransformer {
  countryName: string;
  flag: string;
  region: string;
  population: number;
  capital: string[];
  borders: string[];
  topLevelDomain: string[];
  subregion: string;
  currencies: string[];
  languages: string[];
}

// Country Interface
export interface Country {
  name: CountryName;
  flags: CountryFlag;
  population: string;
  capital: string[];
  region: string;
  borders: string[];
  currencies: CountryCurrency;
  subregion: string;
  languages: CountryLanguage;
  tld: string[];
}

export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlag {
  png: string;
  svg: string;
}

export interface CountryCurrency {
  [key: string]: { name: string; symbol: string };
}

export interface CountryLanguage {
  [key: string]: string;
}
