import { useState, useEffect } from 'react';
import './Movies.css';
import HeaderMovie from '../Header/HeaderMovie';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList ';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function Movies({
  allFilms, //состояние передача всех карточек
  handleCardLike,
  errorsFromApi,
  showAllFilms,
  loading,
  loggedIn,
  likedCards,
}) {
  const [allMovies, setAllMovies] = useState([]); // все фильмы
  const [showedCards, setShowedCards] = useState(null); //список карточек для отображения
  const [filtredFilmsByQuery, setFiltredFilmsByQuery] = useState(null); // отфильтрованные по запросу
  const [queryValues, setQueryValues] = useState(null); //запрос пользователя
  const [messageError, setMessageError] = useState(false); //сообщение об ошибке
  const [filteredMoviesByCheckbox, setFilteredMoviesByCheckbox] = useState([]); //отфильтрованные по запросу и чекбоксу
  const [checkbox, setCheckbox] = useState(false); //состояние кнопки чекбокса по умолчанию false -зеленая

  useEffect(() => {
    if (localStorage.searchedMovies) {
      const movies = JSON.parse(localStorage.getItem('searchedMovies'));
      setShowedCards(movies);

      if (localStorage.shortMovies && checkbox === true) {
        const movies = JSON.parse(localStorage.getItem('shortMovies'));
        setShowedCards(movies);
      }
    } else {
      showMessage();
    }
  }, [checkbox]);

  useEffect(() => {
    if (!localStorage.shortMovies && checkbox === true) {
      showMessage();
    } else {
      hideMessage();
    }
  });

  //если у отфильтрованных фильмов по поиску есть длина,то покажи их
  //если у отфильтр по чекбоксу есть длина, то покажи их
  //изменяем стейт у карточек для рендера showedCards
  useEffect(() => {
    //если фильмы отфтльтр по запросу
    if (filtredFilmsByQuery?.length) {
      const cards = setSelect(filtredFilmsByQuery);
      setShowedCards(cards); //отрендери их
      localStorage.setItem('searchedMovies', JSON.stringify(cards));

      if (checkbox && filteredMoviesByCheckbox.length === 0) {
        showMessage();
      }
      if (!checkbox) {
        hideMessage();
      }
    }
    if (filteredMoviesByCheckbox?.length && checkbox === true) {
      const cards = setSelect(filteredMoviesByCheckbox);
      setShowedCards(cards); //отрендери их
      localStorage.setItem('shortMovies', JSON.stringify(cards));

      if (!checkbox) {
        //если чек-бокс выключен верни обратно фильмы по запросу
        hideMessage();
        const cards = setSelect(filtredFilmsByQuery);
        setShowedCards(cards);
      }
    }
    if (!filtredFilmsByQuery?.length) {
      showMessage();
    }
  }, [filtredFilmsByQuery, filteredMoviesByCheckbox, checkbox]);

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

  //переключатель чек-бокса
  function handleCheck() {
    //при клике устанавливаем checked в противоположное состояние
    setCheckbox(!checkbox);

    if (!checkbox && filtredFilmsByQuery !== null) {
      handleDuration(filtredFilmsByQuery);
      setFilteredMoviesByCheckbox(handleDuration(filtredFilmsByQuery));
    }
  }

  useEffect(() => {
    if (allMovies.length && queryValues) {
      const cards = filterMovies(allMovies, queryValues);
      setFiltredFilmsByQuery(cards);
      cards.length === 0 ? showMessage() : hideMessage();
    }
  }, [allMovies, queryValues]);

  //функции сообщений
  function showMessage() {
    setMessageError(true);
  }
  function hideMessage() {
    setMessageError(false);
  }

  useEffect(() => {
    if (allFilms) {
      setAllMovies(allFilms);
    }
  }, [allFilms]);

  //поиск фильма
  function searchMovie(data) {
    showAllFilms();
    setQueryValues(data);
  }

  function setSelect(cards) {
    return cards.map((card) => {
      return card;
    });
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='movies'>
        <SearchForm
          showAllFilms={showAllFilms}
          onSearch={searchMovie}
          checkbox={checkbox}
          changeCheckbox={handleCheck}
        />
        <MoviesCardList
          cards={showedCards}
          messageError={messageError}
          preloader={loading}
          errorsFromApi={errorsFromApi}
          //isReqErr={isReqErr}
          likedCards={likedCards}
          handleCardLike={handleCardLike}
        />
      </section>
      <Footer />
    </>
  );
}
export default Movies;
