import { Controls, Loading } from '../index.js';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/all';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useState } from 'react';
import { ALL_COUNTRIES_URL } from '../../constant.js';

const HomePage = () => {
  const [filtered, setFiltered] = useState([]);
  const { isLoading, error, data } = useQuery('countries', async () => {
    if (localStorage.getItem('countries')) {
      const data = JSON.parse(localStorage.getItem('countries'));
      setFiltered(data);
      return data;
    }
    const { data } = await axios.get(ALL_COUNTRIES_URL);
    setFiltered(data);
    localStorage.setItem('countries', JSON.stringify(data));
    return data;
  });

  const onFilter = (query, region) => {
    if (!isLoading) {
      let copy = [...data];
      copy = region ? copy.filter(item => item.region.includes(region)) : copy;
      copy = query ? copy.filter(item => item.name.toLowerCase().includes(query.toLowerCase())) : copy;
      setFiltered(copy);
    }
  };

  return <>
    <Controls onFilter={onFilter} />
    {isLoading && <Loading />}
    {error && <h3 className='error'>
      <FiAlertCircle size={30} color={'red'} />
      Something went wrong
    </h3>}
    <ul className='countries__list'>
      {filtered.map(country =>
        <li className='countries__card' key={country.name}>
          <Link to={`/country/${country.name}`}>
            <div className='countries__card-header'>
              <img src={country.flags.png} alt={country.name} />
            </div>
            <div className='countries__card-body'>
              <h3 className='h5'>{country.name}</h3>
              <p><span className='h6'>Population:</span>{country.population.toLocaleString()}</p>
              <p><span className='h6'>Region:</span>{country.region}</p>
              <p><span className='h6'>Capital:</span>{country.capital}</p>
            </div>
          </Link>
        </li>,
      )}
    </ul>
  </>;
};

export default HomePage;
