import { InputHTMLAttributes, useEffect, useState } from 'react';
import { fetchAllCountries } from '../../services/countries.service';
import { Country } from '../../models/country.model';

interface CountryObj {
  label: string;
  value: string;
  meta: {
    flag: string;
  };
}

type Props = InputHTMLAttributes<HTMLSelectElement>;

function CountrySelect(props: Props) {
  const [countries, setCountries] = useState<CountryObj[]>([]);

  const fetchCountries = async () => {
    try {
      const res = await fetchAllCountries();
      setCountries(
        res.map(formatCountryObj).sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        })
      );
    } catch (error) {
      setCountries([]);
    }
  };

  const formatCountryObj = (country: Country) => {
    return { label: country.name.common, value: country.name.common, meta: { flag: country.flag } };
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <select
      {...props}
      value={props.value || ''}
      className='focus:outline-none focus:shadow-none bg-transparent border border-gray-700 rounded-sm px-3 h-[34px] max-md:w-full'>
      <option value=''>All countries</option>
      {countries.map((c) => (
        <option value={c.value} key={c.value}>
          {c.meta.flag} {c.label}
        </option>
      ))}
    </select>
  );
}

export default CountrySelect;
