import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card, handleCardLike, handleDeleteLike, likedCards }) {
  let { pathname } = useLocation();
  const URL = 'https://api.nomoreparties.co/';
  const cardURL = card.image.url ? `${URL}${card.image.url}` : card.image;

  //функция времени
  function time(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}min`;
  }

  //найти 1 элемент у которого id совпадают
  const findCardById = likedCards
    ? likedCards.find((i) => i.movieId === card.id)
    : '';

  //найти какой-нибудь элемент у которого id совпадают
  const isLikePushed = likedCards
    ? likedCards.some((i) => i.movieId === card.id)
    : false;

  return (
    <>
      <li className='card'>
        <div className='card__container'>
          <div className='card__wrap'>
            <p className='card__title'>{card.nameRU}</p>
            <p className='card__duration'>{time(card.duration)}</p>
          </div>

          {pathname === '/movies' && (
            <button
              className={
                isLikePushed ? 'card__btn_liked button' : 'card__btn button'
              }
              onClick={() =>
                handleCardLike(card, isLikePushed, findCardById?._id)
              }
            ></button>
          )}
          {pathname === '/saved-movies' && (
            <button
              className='card__btn_delete'
              onClick={() => handleDeleteLike(card._id)}
            ></button>
          )}
        </div>
        <a href={card.trailerLink} target='_blank' rel='noreferrer'>
          <img className='card__img' src={cardURL} alt={card.nameRU} />
        </a>
      </li>
    </>
  );
}

export default MoviesCard;
