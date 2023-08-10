import React from 'react';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import './App.css';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Notfound from '../Notfound/Notfound';
import * as api from '../../utils/MainApi';
import * as movieApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [likedCards, setLikedCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isReqSuccess, setIsReqSuccess] = useState(false);
  const [isMessageSuccess, setIsMessageSuccess] = useState(false);
  const [allFilms, setAllFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errorsFromApi, setErrorsFromApi] = useState({
    register: {},
    authorize: {},
    profile: {},
    movies: {},
  });

  //функции прелоадера
  function handlePreloaderOn() {
    setLoading(true);
  }
  function handlePreloaderOff() {
    setLoading(false);
  }

  //гадская функция показа и скрытия сообщения о сохранении данных
  function handleShowMessage() {
    setIsMessageSuccess(true);
    setTimeout(() => {
      setIsMessageSuccess(false);
    }, 3000);
  }

  //вход по логину singin
  function onLogin({ email, password }) {
    return api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorsFromApi({ ...errorsFromApi, authorize: err });
      });
  }
  //регистрация пользователя signup
  function onRegister({ name, email, password }) {
    return api
      .register(name, email, password)
      .then((res) => {
        if (res) {
          onLogin({ email, password });
        }
      })
      .catch((err) => {
        setErrorsFromApi({ ...errorsFromApi, register: err });
        console.log(err);
      });
  }
  //редактирование профиля
  function handleEditProfile(user) {
    api
      .editProfile(user)
      .then((res) => {
        if (res) {
          setIsReqSuccess(true);
          handleShowMessage();
        }
      })
      .catch((err) => {
        setErrorsFromApi({ ...errorsFromApi, profile: err });
        console.log(err);
        setIsReqSuccess(false);
      });
  }

  //ставим карточке лайк и дизлайк карточке
  function handleCardLike(card, isLikePushed, id) {
    isLikePushed
      ? handleDeleteLike(id)
      : api
          .postCard(card)
          .then((newMovie) => {
            setLikedCards([...likedCards, newMovie]);
          })
          .catch((err) => {
            console.log(err);
          });
  }

  function handleDeleteLike(id) {
    const searchedLikedMovies = JSON.parse(
      localStorage.getItem('searchedLikedMovies')
    );
    api
      .deleteCard(id)
      .then((res) => {
        //создай новый массив отфильтрованных
        const newListCards = likedCards.filter((card) => card._id !== id);
        setLikedCards(newListCards);

        if (searchedLikedMovies) {
          const newListCardsUpdate = searchedLikedMovies.filter(
            (card) => card._id !== id
          );
          localStorage.setItem(
            'searchedLikedMovies',
            JSON.stringify(newListCardsUpdate)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    loggedIn && localStorage.setItem('savedMovies', JSON.stringify(likedCards));
  }, [likedCards, loggedIn]);

  //удаление ошибок при переходе на другие страницы
  useEffect(() => {
    setErrorsFromApi({
      register: {},
      authorize: {},
      profile: {},
      movies: {},
    });
  }, [location]);

  //Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          navigate(location.pathname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //current User
  //если пользователь авторизован
  useEffect(() => {
    loggedIn &&
      api
        .getUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));

    loggedIn &&
      api
        .getAllCardsSaved()
        .then((cards) => {
          setLikedCards(cards);
          localStorage.setItem('likedCards', JSON.stringify(cards));
        })
        .catch((err) => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      if (localStorage.getItem('beatfilmMovies')) {
        setAllFilms(JSON.parse(localStorage.getItem('beatfilmMovies')));
      } else {
        movieApi
          .getCards()
          .then((cards) => {
            setAllFilms(cards);
            localStorage.setItem('beatfilmMovies', JSON.stringify(cards));
            setErrorsFromApi({ ...errorsFromApi, movies: {} });
          })
          .catch((err) => {
            setErrorsFromApi({ ...errorsFromApi, movies: err });
          })
          .finally(() => {
            handlePreloaderOff();
          });
      }
    }
  }, [loggedIn]);

  //выход из профиля (удаление пользователя из localStorage)
  const handleExit = () => {
    setLoggedIn(false);
    localStorage.clear();
    setCurrentUser({});
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} />} />
            <Route
              path='movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  handleCardLike={handleCardLike}
                  loading={loading}
                  errorsFromApi={errorsFromApi}
                  allFilms={allFilms}
                  loggedIn={loggedIn}
                  likedCards={likedCards}
                  handlePreloaderOn={handlePreloaderOn}
                  handlePreloaderOff={handlePreloaderOff}
                />
              }
            />
            <Route
              path='saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  handleCardLike={handleCardLike}
                  loading={loading}
                  errorsFromApi={errorsFromApi}
                  allFilms={allFilms}
                  loggedIn={loggedIn}
                  likedCards={likedCards}
                  handleDeleteLike={handleDeleteLike}
                />
              }
            />
            <Route
              path='profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  onExit={handleExit}
                  onEditProfile={handleEditProfile}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  isReqSuccess={isReqSuccess}
                  errorsFromApi={errorsFromApi}
                  isMessageSuccess={isMessageSuccess}
                />
              }
            />

            <Route
              path='signup'
              element={
                loggedIn ? (
                  <Navigate to='/movies' />
                ) : (
                  <Register
                    onRegister={onRegister}
                    errorsFromApi={errorsFromApi}
                  />
                )
              }
            />
            <Route
              path='signin'
              element={
                <Login
                  onLogin={onLogin}
                  errorsFromApi={errorsFromApi}
                  loggedIn={loggedIn}
                />
              }
            />

            <Route path='*' element={<Notfound loggedIn={loggedIn} />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
