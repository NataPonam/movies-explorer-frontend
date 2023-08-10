import React from 'react';

import { useNavigate } from 'react-router-dom';
import './Notfound.css';

function Notfound({ loggedIn }) {
  const navigate = useNavigate();
  const back = () => {
    loggedIn ? navigate(-2) : navigate(-1);
  };
  return (
    <div className='error'>
      <div className='error__wrapper'>
        <p className='error__number'>404</p>
        <p className='error__text'>Страница не найдена</p>
      </div>
      <button onClick={back} type='submit' className='error__back button'>
        Назад
      </button>
    </div>
  );
}
export default Notfound;
