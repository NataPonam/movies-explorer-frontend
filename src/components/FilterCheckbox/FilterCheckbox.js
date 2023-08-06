import { useState } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ checkbox, changeCheckbox }) {
  return (
    <form className='checkbox__form'>
      <input
        className='checkbox__input'
        id='checkbox-input'
        type='checkbox'
        checked={checkbox}
        onChange={changeCheckbox}
      ></input>
      <label className='checkbox__lable' for='checkbox-input'>
        Короткометражки
      </label>
    </form>
  );
}

export default FilterCheckbox;
//
