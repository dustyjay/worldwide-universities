import { Country } from '../models/country.model';

export const fetchAllCountries = async (): Promise<Country[]> => {
  return fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
