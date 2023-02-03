import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowLeft } from 'react-icons/all';
import { Loading } from '../index.js';
import { FiAlertCircle } from 'react-icons/all.js';
import { useQuery } from 'react-query';
import { filterByCode, searchByCountry } from '../../constant.js';

const DetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [countryBorders, setCountryBorders] = useState([]);
  const theme = document.body.getAttribute('data-theme');

  const { isLoading, error, refetch } = useQuery('country', async () => {
    const { data } = await axios.get(searchByCountry(name));
    setCountry({
      name: data[0].name,
      nativeName: data[0].nativeName,
      flag: data[0].flag,
      capital: data[0].capital,
      population: data[0].population,
      region: data[0].region,
      subregion: data[0].subregion,
      topLevelDomain: data[0].topLevelDomain,
      currencies: data[0].currencies,
      languages: data[0].languages,
      borders: data[0].borders,
    });

    if (data[0].borders && data[0].borders.length !== 0) {
      const { data: dataBorder } = await axios.get(filterByCode(data[0].borders));
      setCountryBorders(dataBorder.map(b => b.name));
    }
  });

  useEffect(() => {
    refetch();
  }, [name]);

  return <>
    <button className={`button ${theme === 'light' ? 'button--primary' : 'button--green'}`}
            onClick={() => navigate(-1)}>
      <FiArrowLeft size={20} />
      Go back
    </button>

    {isLoading && <Loading />}
    {error && <h3 className='error'>
      <FiAlertCircle size={30} color={'red'} />
      Something went wrong
    </h3>}

    {country && <div className='countries-detail'>
      <div className='countries-detail__column'>
        <img className='countries-detail__flag' src={country.flag} alt='' />
      </div>
      <div className='countries-detail__column'>
        <h1 className='h3'>{country.name}</h1>
        <p><span className='h6'>Native Name:</span>{country.nativeName}</p>
        <p><span className='h6'>Population:</span>{country.population.toLocaleString()}</p>
        <p><span className='h6'>Region:</span>{country.region}</p>
        <p><span className='h6'>Sub Region:</span>{country.subregion}</p>
        <p><span className='h6'>Capiital:</span>{country.capital}</p>
        <p>
          <span className='h6'>Top Level Domain:</span>
          {country.topLevelDomain.map((tld) => <span key={tld}>{tld}</span>)}
        </p>
        <p>
          <span className='h6'>Currency:</span>
          {country.currencies && country.currencies[0]?.name ? country.currencies[0]?.name : 'Not found'}
        </p>
        <p className='countries-detail__languages'>
          <span className='h6'>Languages:</span>
          {country.languages && country.languages.map((lang) =>
            <span
              key={lang.name}>{lang.name}{lang.name === country.languages[country.languages.length - 1].name ? '' : ','}</span>,
          )}
        </p>
        <div className='countries-detail__borders'>
          <p className='h6'>Border Countries: </p>
          {country.borders && country.borders.length !== 0
            ? <ul>
              {countryBorders.map(border =>
                <Link to={`/country/${border}`}
                      key={border}
                      className={`button ${theme === 'light' ? 'button--primary' : 'button--green'}`}
                >{border}</Link>,
              )}</ul>
            : 'There is no border country'
          }
        </div>
      </div>
    </div>}
  </>;
};

export default DetailPage;
