import { IUniversity, IUniversityQueryObj } from '../models/university.model';

export const fetchUniversities = async (query: IUniversityQueryObj): Promise<IUniversity[]> => {
  const queryString = new URLSearchParams(query).toString();
  return fetch(`http://universities.hipolabs.com/search?${queryString}&limit=20`)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
