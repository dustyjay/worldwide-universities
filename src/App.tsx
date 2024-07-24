import { Fragment } from 'react/jsx-runtime';
import SearchBox from './components/search-box';
import CountrySelect from './components/country-select';
import { useEffect, useRef, useState } from 'react';
import { IUniversity, IUniversityQueryObj } from './models/university.model';
import { fetchUniversities } from './services/universities.service';
import University from './components/university';

function App() {
  const [query, setQuery] = useState<IUniversityQueryObj>({
    limit: '150',
    offset: '0'
  });
  const [unis, setUnis] = useState<IUniversity[]>([]);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const isLoading = useRef(false);

  const fetchData = async () => {
    try {
      setIsEndOfList(false);
      isLoading.current = true;
      const res = await fetchUniversities(query);

      setUnis((u) => (query.offset === '0' ? res : u.concat(res)));
      if (res.length < +query.limit) {
        setIsEndOfList(true);
      }
    } catch (error) {
      setUnis([]);
    } finally {
      isLoading.current = false;
    }
  };

  const fetchMoreData = () => {
    if (isLoading.current) return;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      setQuery((q) => ({ ...q, offset: `${+q.offset + 1}` }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  useEffect(() => {
    window.addEventListener('scroll', fetchMoreData);
    return () => {
      window.removeEventListener('scroll', fetchMoreData);
    };
  }, []);

  return (
    <Fragment>
      <header className='flex gap-4 sticky top-0 py-8 px-8 bg-[#f8e28a]'>
        <SearchBox
          placeholder='Search university'
          value={query.name}
          onValueChange={(name) => setQuery({ ...query, name, offset: '0' })}
        />
        <CountrySelect
          value={query.country}
          onChange={(e) => setQuery({ ...query, country: e.target.value, offset: '0' })}
        />
      </header>
      <main className='pb-20 px-8'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {unis.map((u, index) => (
            <University key={index} {...u} />
          ))}
        </div>
        {isLoading.current && <p className='text-center text-lg py-6'>Loading...</p>}
        {isEndOfList && <p className='text-center text-lg py-6'>End of list</p>}
      </main>
    </Fragment>
  );
}

export default App;
