import './MoviesCard.css';
import React from 'react';
import heart from '../../images/iconHeart.svg';
import heartEmpty from '../../images/iconEpmtyHeart.svg';
import movie1 from '../../images/movie1.png';
import movie2 from '../../images/movie2.png';
import movie3 from '../../images/movie3.png';
import movie4 from '../../images/movie4.png';
import movie5 from '../../images/movie5.png';
import movie6 from '../../images/movie6.png';
import movie7 from '../../images/movie7.png';
function MoviesCard() {
  return (
    <>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>33 слова о дизайне</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heart} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie1} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>Киноальманах «100 лет дизайна»</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heart} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie2} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>В погоне за Бенкси</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heartEmpty} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie3} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>Баския: Взрыв реальности</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heartEmpty} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie4} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>Бег это свобода</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heart} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie5} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>Книготорговцы</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heartEmpty} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie6} alt='кадр из фильма'></img>
      </li>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>Когда я думаю о Германии ночью</p>
            <p className='card__duration'>1ч 42м</p>
          </div>
          <button className='card__btn button'>
            <img className='card__icon' src={heartEmpty} alt='сердечко'></img>
          </button>
        </div>
        <img className='card__img' src={movie7} alt='кадр из фильма'></img>
      </li>
    </>
  );
}

export default MoviesCard;
