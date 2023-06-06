import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <img
            className='header__logo'
            src={logo}
            alt='логотип сайта кружок'
          ></img>
        </div>
        <div className='header__container registration'>
          <Link to='/signup' class='header__text link'>
            Регистрация
          </Link>
          <Link to='/signin'>
            <button class='header__button button'>
              <p class='header__button_text'>Войти</p>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
export default Header;
