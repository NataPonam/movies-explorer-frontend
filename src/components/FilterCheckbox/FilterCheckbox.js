import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <form className='checkbox__form'>
      <input
        className='checkbox__input'
        id='checkbox-input'
        type='checkbox'
      ></input>
      <label className='checkbox__lable' for='checkbox-input'>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;
