import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Notfound from '../Notfound/Notfound';
import Footer from '../Footer/Footer';
import ProfileError from '../Profile/ProfileError'; //для наглядности верстки при ошибке изменения профиля

function App() {
  return (
    <div className='page'>
      <div className='page__container'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='movies' element={<Movies />} />
          <Route path='saved-movies' element={<SavedMovies />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/error' element={<ProfileError />} />
          <Route path='signup' element={<Register />} />
          <Route path='signin' element={<Login />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
