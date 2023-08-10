import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import iconAccount from '../../images/iconAccount.svg';

function HeaderMovie() {
  const [active, setActive] = useState(false);
  return (
    <header className='header header-movies'>
      <div className='header__container logo'>
        <Link to='/'>
          <img
            className='header__logo'
            src={logo}
            alt='логотип сайта кружок'
          ></img>
        </Link>
      </div>
      <div
        className={
          active ? 'header__container menu active' : 'header__container menu'
        }
        active={active}
        setActive={setActive}
      >
        <div className='header__menu-box'>
          <Link
            to='/'
            className={
              active
                ? 'header__text-movies_main link  active'
                : 'header__text-movies_main link'
            }
            active={active}
            setActive={setActive}
          >
            Главная
          </Link>
          <NavLink
            to='/movies'
            className={({ isActive }) =>
              isActive
                ? 'header__text-movies bold link '
                : 'header__text-movies link'
            }
          >
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            className={({ isActive }) =>
              isActive
                ? 'header__text-movies bold link '
                : 'header__text-movies link'
            }
          >
            Сохраненные фильмы
          </NavLink>
        </div>
        <div className='header__profile-box'>
          <Link to='/profile' className='header__text-movies_accaunt link'>
            Аккаунт
          </Link>
          <Link to='/profile'>
            <button className='header__button-movies'>
              <img src={iconAccount} alt='иконка человек'></img>
            </button>
          </Link>
        </div>
      </div>
      <button
        className={
          active ? 'header__button-menu active' : 'header__button-menu'
        }
        active={active}
        setActive={setActive}
        onClick={() => setActive(!active)}
      ></button>
      <div
        className={active ? 'overlay active' : 'overlay'}
        active={active}
        setActive={setActive}
      ></div>
    </header>
  );
}

export default HeaderMovie;
