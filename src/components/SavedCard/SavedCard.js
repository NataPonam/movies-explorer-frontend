import './SavedCard.css';

import x from '../../images/iconX.svg';
import movie1 from '../../images/movie1.png';
import movie2 from '../../images/movie2.png';
import movie3 from '../../images/movie3.png';

function SavedCard() {
  return (
    <>
      <ul className='card__list'>
        <li className='card'>
          <div className='card__container'>
            <p className='card__title'>33 слова о дизайне</p>
            <p className='card__diration'>1ч 42м</p>
            <button className='card__btn button'>
              <img className='card__icon' src={x} alt='иконка крестик'></img>
            </button>
          </div>
          <img
            className='card__img'
            src={movie1}
            alt='женщина облокотившись на машину смотрит на детей'
          ></img>
        </li>
        <li className='card'>
          <div className='card__container'>
            <p className='card__title'>Киноальманах «100 лет дизайна»</p>
            <p className='card__diration'>1ч 42м</p>
            <button className='card__btn button'>
              <img className='card__icon' src={x} alt='иконка крестик'></img>
            </button>
          </div>
          <img className='card__img' src={movie2} alt='фото мужчины'></img>
        </li>
        <li className='card'>
          <div className='card__container'>
            <p className='card__title'>В погоне за Бенкси</p>
            <p className='card__diration'>1ч 42м</p>
            <button className='card__btn button'>
              <img className='card__icon' src={x} alt='иконка крестик'></img>
            </button>
          </div>
          <img
            className='card__img'
            src={movie3}
            alt='мужчина играет на гитаре'
          ></img>
        </li>
      </ul>
      <div className='btn__container'></div>
    </>
  );
}

export default SavedCard;
