import { useEffect, useState } from 'react';

const OPTIONS = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const Controls = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    onFilter(search, region);
  }, [search, region]);

  return <div className='controls'>
    <label>
      <input
        type='text'
        placeholder='Search for a country...'
        value={search}
        onChange={({ target: { value } }) => setSearch(value)} />
    </label>

    <select defaultValue={region} onChange={({ target: { value } }) => setRegion(value)}>
      <option value=''>Select Region</option>
      {OPTIONS.map((region, idx) => <option key={idx} value={region}>{region}</option>)}
    </select>
  </div>;
};

export default Controls;
