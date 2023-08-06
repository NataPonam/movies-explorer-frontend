import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function MoviesCardList({
  cards,
  handleCardLike,
  handleDeleteLike,
  preloader,
  messageError,
  errorsFromApi,
  likedCards,
}) {
  const [shownCards, setShownCards] = useState(0);
  const [islength, setIsLength] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth > 320) {
      setShownCards(7);
    } else {
      setShownCards(5);
    }
  }, []);

  //Согласно макету количество отображаемых карточек изменяется
  // только при дисплее в 320px - рендер по 5 карточек
  //если более 320px - реднер по 7 карточек
  function handleMore() {
    if (window.innerWidth > 320) {
      setShownCards(shownCards + 7);
    } else {
      setShownCards(shownCards + 5);
    }
  }

  //проверка длины массива карточек
  useEffect(() => {
    if (cards !== null) {
      let newCard = cards.length;
      if (newCard > shownCards) {
        setIsLength(false);
      } else {
        setIsLength(true);
      }
    }
  }, [cards, shownCards]);

  return (
    <>
      {errorsFromApi?.movies.message ? (
        <p className='cards__error-message'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      ) : (
        <section className='cards'>
          {messageError ? (
            <p className='cards__error-message'>Ничего не найдено</p>
          ) : (
            <ul className='card__list'>
              {preloader ? (
                <Preloader />
              ) : (
                cards
                  ?.slice(0, shownCards)
                  .map((card) => (
                    <MoviesCard
                      key={card.id || card.movieId}
                      card={card}
                      handleCardLike={handleCardLike}
                      handleDeleteLike={handleDeleteLike}
                      likedCards={likedCards}
                    />
                  ))
              )}
            </ul>
          )}

          {pathname === '/movies' ? (
            islength === false || !messageError ? (
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
