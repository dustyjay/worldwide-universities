export type Country = {
  name: CountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, { name: string; symbol: string }>;
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: Record<string, string>;
  translations: Record<string, { common: string; official: string }>;
  latlng: string[];
  landlocked: boolean;
  area: number;
  demonyms: Record<string, { f: string; m: string }>;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: string[];
    side: 'right' | 'left';
  };
  timezones: string[];
  continents: string[];
  flags: {
    png?: string;
    svg?: string;
  };
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
};

type CountryName = {
  common: string;
  official: string;
  nativeName: {
    [t: string]: {
      official: string;
      common: string;
    };
  };
};
