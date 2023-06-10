import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import loupe from '../../images/loupe.svg';

function SearchForm() {
  return (
    <div className='search__container'>
      <form className='search__form'>
        <input className='search__input' placeholder='Фильм'></input>
        <button className='search__button button'>
          <img src={loupe} alt='иконка лупа'></img>
        </button>
      </form>

      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
