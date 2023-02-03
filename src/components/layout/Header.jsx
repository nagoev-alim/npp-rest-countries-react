import { Link } from 'react-router-dom';
import { capitalStr } from '../../utils/capitalStr.js';
import { FiMoon, FiSun } from 'react-icons/all';
import { useEffect, useState } from 'react';

const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme')
      ? JSON.parse(localStorage.getItem('theme'))
      : 'light',
  );

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return <header className='header'>
    <nav className='nav'>
      <Link className='h5' to='/'>Where is the world?</Link>
      <button
        className={`header__toggle button ${theme === 'light' ? 'button--primary' : 'button--red'}`}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        {capitalStr(theme)} Mode
      </button>
    </nav>
  </header>;
};

export default Header;
