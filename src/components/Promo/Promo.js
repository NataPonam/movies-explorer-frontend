import React from 'react';
import './Promo.css';
import promo from '../../images/promo.svg';

function Promo() {
  return (
    <section className='promo' id='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
      <img className='promo__img' src={promo} alt='рисунок - 6 колец'></img>
    </section>
  );
}
export default Promo;

