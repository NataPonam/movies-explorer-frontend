import React from 'react';
import './SavedMovies.css';
import HeaderMovie from '../Header/HeaderMovie';
import SearchForm from '../SearchForm/SearchForm';
import SavedCard from '../SavedCard/SavedCard';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <HeaderMovie />
      <section className='saved'>
        <SearchForm />
        <SavedCard />
      </section>
      <Footer />
    </>
  );
}
export default SavedMovies;
