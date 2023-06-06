import React from 'react';
import './Promo.css';
import promo from '../../images/promo.svg';

function Promo() {
  return (
    <section className='promo__container' id='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className='promo__img' src={promo} alt='рисунок-кольца'></img>
    </section>
  );
}
export default Promo;
