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
  const [isMessageSuccess, setIsMessageSuccess] = useState(false); //показать сообщение об удачном сохранении данных
  const [allFilms, setAllFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [errorsFromApi, setErrorsFromApi] = useState({
    register: {},
    authorize: {},
    profile: {},
    movies: {},
  });

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

  //выход из профиля (удаление пользователя из localStorage)
  function handleExit() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('likedCards');
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
  }

  //гадская функция показа и скрытия сообщения о сохранении данных
  function handleShowMessage() {
    setIsMessageSuccess(true);
    setTimeout(() => {
      setIsMessageSuccess(false);
    }, 3000);
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
    api
      .deleteCard(id)
      .then((res) => {
        //создай новый массив отфильтрованных
        const newListCards = likedCards.filter((card) => card._id !== id);
        setLikedCards(newListCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  //функции прелоадера
  function handlePreloaderOn() {
    setLoading(true);
  }
  function handlePreloaderOff() {
    setLoading(false);
  }

  function showAllFilms() {
    handlePreloaderOn();
    return movieApi
      .getCards()
      .then((cards) => {
        setAllFilms(cards);
        setErrorsFromApi({ ...errorsFromApi, movies: {} });
        handlePreloaderOff();
      })
      .catch((err) => {
        setErrorsFromApi({ ...errorsFromApi, movies: err });
      })
      .finally(() => {
        handlePreloaderOff();
      });
  }

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
                  showAllFilms={showAllFilms}
                  allFilms={allFilms}
                  loggedIn={loggedIn}
                  likedCards={likedCards}
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
                  showAllFilms={showAllFilms}
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

            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*useEffect(() => {
    api.getAllCards().then((data) => console.log(data));
  });*/
/*const fetchAllMovies = () => {
    fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'aplication/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        //  updateMovies(res);
      });
  };*/
