import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { useLocation } from 'react-router-dom';

function MoviesCardList({
  cards,
  handleCardLike,
  handleDeleteLike,
  messageError,
  errorsFromApi,
  likedCards,
}) {
  const [shownCards, setShownCards] = useState(0);
  const [islength, setIsLength] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth > 480) {
      setShownCards(4);
    } else {
      setShownCards(5);
    }
  }, []);

  //Согласно макету количество отображаемых карточек изменяется
  // только при дисплее в 320px - рендер по 5 карточек
  //если более 320px - реднер по 7 карточек
  function handleMore() {
    if (window.innerWidth > 480) {
      setShownCards(shownCards + 4);
    } else {
      setShownCards(shownCards + 2);
    }
  }

  //проверка длины массива карточек
  useEffect(() => {
    if (cards !== null) {
      let newCard = cards.length;
      if (newCard > shownCards) {
        setIsLength(true);
      } else {
        setIsLength(false);
      }
    }
  }, [cards, shownCards]);

  useEffect(() => {
    if (cards === null && !messageError) {
      setIsLength(false);
    }
  }, [cards, messageError]);

  return (
    <>
      {errorsFromApi?.movies.message ? (
        <p className='cards__error-message'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        <section className='cards'>
          <ul className='card__list'>
            {cards?.slice(0, shownCards).map((card) => (
              <MoviesCard
                key={card.id || card.movieId}
                card={card}
                handleCardLike={handleCardLike}
                handleDeleteLike={handleDeleteLike}
                likedCards={likedCards}
              />
            ))}
          </ul>

          {pathname === '/movies' ? (
            islength === true && !messageError ? (
              <button className='card__button-more button' onClick={handleMore}>
                Ещё
              </button>
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
