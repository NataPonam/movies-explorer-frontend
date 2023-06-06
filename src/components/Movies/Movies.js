import { Link } from 'react-router-dom';
import './Movies.css';
import HeaderMovie from '../Header/HeaderMovie';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList ';

function Movies() {
  return (
    <div className='movies'>
      <HeaderMovie />
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
export default Movies;
