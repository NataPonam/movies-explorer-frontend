import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import loupe from '../../images/loupe.svg';

function SearchForm({ onSearch, checkbox, changeCheckbox }) {
  const [request, setRequest] = useState(''); //запрос пользователя
  const [reqError, setReqError] = useState(false); //ошибка при запросе пользователя
  const { pathname } = useLocation();

  //функция изменения поля ввода
  function handleChangeForm(e) {
    setRequest(e.target.value);

    if (pathname === '/movies') {
      localStorage.removeItem('shortMovies');
      localStorage.removeItem('searchedMovies');
    }
    if (pathname === '//saved-movies') {
      localStorage.removeItem('likedCards');
    }
  }

  //сабмит формы
  function handleSubmit(e) {
    e.preventDefault();
    if (request.length === 0) {
      setReqError(true);
    } else {
      setReqError(false);
      onSearch(request); //то, что ввели в поиске
    }
  }

  return (
    <div className='search__container'>
      <form className='search__form' onSubmit={handleSubmit}>
        <input
          id='search'
          name='request'
          type='text'
          className='search__input'
          placeholder='Фильм'
          value={request || ''}
          onChange={handleChangeForm}
        ></input>
        <button className='search__button button' type='submit'>
          <img src={loupe} alt='иконка лупа'></img>
        </button>
      </form>

      {reqError && (
        <span className='input__error'>
          <p className='input__error_text search'>
            Нужно ввести ключевое слово
          </p>
        </span>
      )}
      <FilterCheckbox checkbox={checkbox} changeCheckbox={changeCheckbox} />
    </div>
  );
}

export default SearchForm;
