import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList ';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';

function Movies({
  allFilms,
  handleCardLike,
  errorsFromApi,
  loading,
  loggedIn,
  likedCards,
  handlePreloaderOn,
  handlePreloaderOff,
}) {
  const [showedCards, setShowedCards] = useState([]); //список карточек для отображения
  const [searchQuery, setSearchQuery] = useState({});
  const searchedMovies = localStorage.getItem('searchedMovies');
  const queryHistory = localStorage.getItem('queryHistory');

  useEffect(() => {
    if (searchedMovies) {
      setShowedCards(JSON.parse(searchedMovies));
    }
  }, [searchedMovies]);

  useEffect(() => {
    if (queryHistory) {
      setSearchQuery(JSON.parse(queryHistory));
    }
  }, [queryHistory]);

  function filterMovies(query) {
    if (!showedCards.length) {
      handlePreloaderOn();
    }
    setTimeout(
      () => {
        let filtered = [];
        localStorage.setItem('queryHistory', JSON.stringify(query));

        if (query.isShortFilmChecked) {
          filtered = allFilms.filter((card) => {
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
          localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        } else if (!query.isShortFilmChecked) {
          filtered = allFilms.filter((card) => {
            const movieRu = String(card.nameRU)
              .toLowerCase()
              .includes(query.searchText.toLowerCase());
            const movieEn = String(card.nameEN)
              .toLowerCase()
              .includes(query.searchText.toLowerCase());
            return movieRu || movieEn;
          });

          setShowedCards(filtered);
          localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        }

        handlePreloaderOff();
      },
      showedCards.length ? 0 : 1000
    );
  }

  const handleReset = () => {
    setShowedCards([]);
    setSearchQuery({});
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('queryHistory');
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='movies'>
        <SearchForm
          onFilter={filterMovies}
          searchQuery={searchQuery}
          onReset={handleReset}
        />
        {loading ? (
          <Preloader />
        ) : showedCards.length ? (
          <MoviesCardList
            cards={showedCards}
            preloader={loading}
            errorsFromApi={errorsFromApi}
            likedCards={likedCards}
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

export default Movies;

  
