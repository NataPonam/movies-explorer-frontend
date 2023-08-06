import React from 'react';
import { useState, useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList ';

function SavedMovies({
  loggedIn,
  handleCardLike,
  handleDeleteLike,
  loading,
  likedCards,
  errorsFromApi,
}) {
  const [showedCards, setShowedCards] = useState(null); //список карточек для отображения
  const [queryValues, setQueryValues] = useState(null); //запрос пользователя
  const [messageError, setMessageError] = useState(false); //сообщение об ошибке
  const [checkbox, setCheckbox] = useState(false); //состояние кнопки чекбокса по умолчанию false -зеленая

  //фильтр фильмов по слову
  const filterMovies = (cards, searchQuery) => {
    return cards.filter((card) => {
      const movieRu = String(card.nameRU).toLowerCase();
      const movieEn = String(card.nameEN).toLowerCase();
      return movieRu.includes(searchQuery) || movieEn.includes(searchQuery);
    });
  };

  //функция фильтрации фильмов по продолжительности
  function handleDuration(cards) {
    return cards.filter((card) => card.duration < 40);
  }

  //функции сообщений
  function showMessage() {
    setMessageError(true);
  }
  function hideMessage() {
    setMessageError(false);
  }

  useEffect(() => {
    if (likedCards.length && queryValues) {
      const cards = filterMovies(likedCards, queryValues);
      // setFiltredFilmsByQuery(cards);
      setShowedCards(cards);
      cards.length === 0 ? showMessage() : hideMessage();
    }
  }, [likedCards, queryValues]);

  //переключатель чек-бокса
  function handleCheck() {
    setCheckbox(!checkbox);
  }

  useEffect(() => {
    if (checkbox === true) {
      setShowedCards(handleDuration(likedCards));
      if (handleDuration(likedCards).length === 0) {
        showMessage();
      }
    }
  }, [checkbox, likedCards]);

  useEffect(() => {
    if (checkbox === false) {
      setShowedCards(likedCards);
      hideMessage();
    }
  }, [checkbox, likedCards]);

  //поиск фильма
  function searchMovie(data) {
    const likedCardList = JSON.parse(localStorage.getItem('likedCards'));
    setShowedCards(likedCardList);

    setQueryValues(data);
    console.log(likedCardList);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='saved'>
        <SearchForm
          onSearch={searchMovie}
          checkbox={checkbox}
          changeCheckbox={handleCheck}
        />
        <MoviesCardList
          cards={showedCards}
          messageError={messageError}
          preloader={loading}
          errorsFromApi={errorsFromApi}
          likedCards={likedCards}
          handleDeleteLike={handleDeleteLike}
          handleCardLike={handleCardLike}
        />
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;
