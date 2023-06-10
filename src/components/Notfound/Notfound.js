import React from 'react';
import { Link } from 'react-router-dom';
import './Notfound.css';

function Notfound() {
  return (
    <div className='error'>
      <div className='error__wrapper'>
        <p className='error__number'>404</p>
        <p className='error__text'>Страница не найдена</p>
      </div>
      <Link to='/' className='error__back link'>
        Назад
      </Link>
    </div>
  );
}
export default Notfound;
