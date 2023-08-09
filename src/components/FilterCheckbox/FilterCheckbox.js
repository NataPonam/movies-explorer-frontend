import { useLocation } from 'react-router-dom';
import './FilterCheckbox.css';

function FilterCheckbox({ isChecked, onCheck, searchText }) {
  // const { pathname } = useLocation();
  console.log(searchText);

  return (
    <form className='checkbox__form'>
      <input
        className='checkbox__input'
        type='checkbox'
        checked={isChecked || ''}
        onChange={onCheck}
      ></input>

      <label className='checkbox__lable' for='checkbox-input'>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;
