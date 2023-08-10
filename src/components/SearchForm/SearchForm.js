import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import loupe from '../../images/loupe.svg';
import x from '../../images/iconX.svg';

function SearchForm({ onFilter, searchQuery, onReset }) {
  //const { pathname } = useLocation();
  const [searchText, setSearchText] = useState('');
  const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
  const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);
  const [reqError, setReqError] = useState(false);

  useEffect(() => {
    if (searchQuery.searchText) {
      setSearchText(searchQuery.searchText);
    }
  }, [searchQuery.searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const checkFilterBox = () => {
    if (searchText !== '') {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchText,
        isShortFilmChecked: !isShortFilmChecked,
      });
    } else {
      setIsShortFilmChecked(!isShortFilmChecked);

      onFilter({
        searchText: searchQuery.searchText,
        isShortFilmChecked: !isShortFilmChecked,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*  if (pathname === '/movies') {
      localStorage.removeItem('queryHistory');
      localStorage.removeItem('searchedMovies');
    
    }
    if (pathname === '/saved-movies') {
      localStorage.removeItem('searchedLikedMovies');
      localStorage.removeItem('queryLikedHistory');
      //;
    }*/

    if (!searchText) {
      setReqError(true);

      return;
    } else {
      onFilter({ searchText, isShortFilmChecked });
    }
  };

  return (
    <div className='search__container'>
      <form className='search__form' onSubmit={handleSubmit}>
        <input
          id='search'
          name='request'
          type='text'
          className='search__input'
          placeholder='Фильм'
          value={searchText || ''}
          onChange={handleChange}
        ></input>

        <button
          className='clear__button'
          type='submit'
          onClick={() => {
            onReset();
            setSearchText('');
          }}
        >
          <img src={x} alt='иконка лупа'></img>
        </button>

        <button className='search__button button' type='submit'>
          <img src={loupe} alt='иконка лупа'></img>
        </button>
      </form>

      {reqError && !searchText && (
        <span className='input__error'>
          <p className='input__error_text search'>
            Нужно ввести ключевое слово
          </p>
        </span>
      )}
      <FilterCheckbox
        isChecked={searchQuery.isShortFilmChecked}
        onCheck={checkFilterBox}
        searchText={searchText}
      />
    </div>
  );
}

export default SearchForm;
