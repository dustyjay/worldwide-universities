import { Fragment } from 'react/jsx-runtime';
import SearchBox from './components/search-box';
import CountrySelect from './components/country-select';
import { useEffect, useState } from 'react';
import { IUniversity, IUniversityQueryObj } from './models/university.model';
import { fetchUniversities } from './services/universities.service';
import University from './components/university';

function App() {
  const [query, setQuery] = useState<IUniversityQueryObj>({});
  const [unis, setUnis] = useState<IUniversity[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetchUniversities(query);
      setUnis(res);
    } catch (error) {
      setUnis([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <Fragment>
      <header className='flex gap-4 mb-6'>
        <SearchBox
          placeholder='Search university'
          value={query.name}
          onValueChange={(name) => setQuery({ ...query, name })}
        />
        <CountrySelect
          value={query.country}
          onChange={(e) => setQuery({ ...query, country: e.target.value })}
        />
      </header>
      <main>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {unis.map((u, index) => (
            <University key={index} {...u} />
          ))}
        </div>
      </main>
    </Fragment>
  );
}

export default App;
