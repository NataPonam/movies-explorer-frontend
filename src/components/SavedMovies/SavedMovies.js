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
  const [messageError, setMessageError] = useState(false); //сообщение об ошибке
  const [showedCards, setShowedCards] = useState([]); //список карточек для отображения
  const [searchQuery, setSearchQuery] = useState({});
  const searchedMovies = localStorage.getItem('searchedLikedMovies');
  const queryHistory = localStorage.getItem('queryLikedHistory');

  useEffect(() => {
    if (searchedMovies) {
      setShowedCards(JSON.parse(searchedMovies));
    } else {
      setShowedCards(likedCards);
    }
  }, [searchedMovies, likedCards, searchQuery]);

  useEffect(() => {
    if (queryHistory) {
      setSearchQuery(JSON.parse(queryHistory));
    } else {
      setSearchQuery({ ...queryHistory, searchText: '' });
    }
  }, [queryHistory, likedCards]);

  function filterMovies(query) {
    localStorage.setItem('queryLikedHistory', JSON.stringify(query));

    let filtered = [];

    if (query.isShortFilmChecked) {
      filtered = likedCards.filter((card) => {
        const shorts = card.duration <= 40;
        const movieRu = String(card.nameRU)
          .toLowerCase()
          .includes(query.searchText.toLowerCase());
        const movieEn = String(card.nameEN)
          .toLowerCase()
          .includes(query.searchText.toLowerCase());

        return (movieRu && shorts) || (movieEn && shorts);
      });

      setShowedCards(filtered);
      localStorage.setItem('searchedLikedMovies', JSON.stringify(filtered));
    } else if (!query.isShortFilmChecked) {
      filtered = likedCards.filter((card) => {
        const movieRu = String(card.nameRU)
          .toLowerCase()
          .includes(query.searchText.toLowerCase());
        const movieEn = String(card.nameEN)
          .toLowerCase()
          .includes(query.searchText.toLowerCase());
        return movieRu || movieEn;
      });

      setShowedCards(filtered);
      localStorage.setItem('searchedLikedMovies', JSON.stringify(filtered));
    }
  }
  const handleReset = () => {
    setShowedCards(likedCards);
    setSearchQuery({});
    localStorage.removeItem('searchedLikedMovies');
    localStorage.removeItem('queryLikedHistory');
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='saved'>
        <SearchForm
          onFilter={filterMovies}
          searchQuery={searchQuery}
          onReset={handleReset}
        />
        {showedCards.length ? (
          <MoviesCardList
            cards={showedCards}
            messageError={messageError}
            preloader={loading}
            errorsFromApi={errorsFromApi}
            likedCards={likedCards}
            handleDeleteLike={handleDeleteLike}
            handleCardLike={handleCardLike}
          />
        ) : (
          searchedMovies && (
            <p className='cards__error-message'>Ничего не найдено</p>
          )
        )}
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;
