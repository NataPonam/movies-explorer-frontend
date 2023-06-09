import React from 'react';
import './Portfolio.css';
import '../Section/Section.css';
import arrow from '../../images/arrow.svg';

function Portfolio() {
  return (
    <section className='portfolio__container section' id='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>

      <ul className='portfolio__list'>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link link'
            href='https://github.com/NataPonam/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Статичный сайт</p>
            <img
              className='portfolio__img'
              src={arrow}
              alt='стрелка вверх'
            ></img>
          </a>
        </li>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link link'
            href='https://github.com/NataPonam/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Адаптивный сайт</p>
            <img
              className='portfolio__img'
              src={arrow}
              alt='стрелка вверх'
            ></img>
          </a>
        </li>
        <li className='portfolio__list_item'>
          <a
            className='portfolio__link link'
            href='https://github.com/NataPonam/react-mesto-auth'
            target='_blank'
            rel='noreferrer'
          >
            <p className='portfolio__text'>Одностраничное приложение</p>
            <img
              className='portfolio__img'
              src={arrow}
              alt='стрелка вверх'
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
