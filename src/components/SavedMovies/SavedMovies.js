import React from 'react';
import './SavedMovies.css';
import HeaderMovie from '../Header/HeaderMovie';
import SearchForm from '../SearchForm/SearchForm';
import SavedCard from '../SavedCard/SavedCard';

function SavedMovies() {
  return (
    <section className='saved'>
      <HeaderMovie />
      <SearchForm />
      <SavedCard />
    </section>
  );
}
export default SavedMovies;
