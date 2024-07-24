import { IUniversity, IUniversityQueryObj } from '../models/university.model';

const cleanQueryParams = (obj: IUniversityQueryObj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) acc[key as keyof IUniversityQueryObj] = value;
    return acc;
  }, {} as IUniversityQueryObj);
};

export const fetchUniversities = async (query: IUniversityQueryObj): Promise<IUniversity[]> => {
  const cleanQuery = cleanQueryParams(query);

  const queryString = new URLSearchParams(cleanQuery).toString();
  return fetch(`http://universities.hipolabs.com/search?${queryString}`)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
