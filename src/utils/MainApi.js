//Api запросов к моему серверу (сохранение данных пользователя, фильмов)

export const URL = 'https://api.natapo.nomoredomains.monster';

//export const URL = 'natapo.nomoredomains.monster';

const checkResponse = (res) => {
  if (res.ok === true) {
    return res.json();
  }
  return res.text().then((text) => {
    return Promise.reject({
      resStatus: res.status,
      resErrorMessage:
        JSON.parse(text).message === 'Validation failed'
          ? JSON.parse(text).validation.body.message
          : JSON.parse(text).message,
    });
  });
};

const checkResponseRegister = (res) => {
  if (res.ok === true) {
    return res.json();
  }
  return Promise.reject({
    resStatus: res.status,
    resErrorMessage:
      (res.status === 500 ? 'На сервере произошла ошибка.' : '') ||
      (res.status === 409
        ? 'Пользователь с таким email уже существует.'
        : '') ||
      (res.status === 400 || 401 || 403
        ? 'При регистрации пользователя произошла ошибка.'
        : '') ||
      (res.status === 404
        ? ' 404 Страница по указанному маршруту не найдена.'
        : ''),
  });
};

const checkResponseLogin = (res) => {
  if (res.ok === true) {
    return res.json();
  }
  return Promise.reject({
    resStatus: res.status,
    resErrorMessage:
      (res.status === 500 ? '505 На сервере произошла ошибка.' : '') ||
      (res.status === 401 ? 'Вы ввели неверный логин или пароль.' : '') ||
      (res.status === 400
        ? ' При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
        : '') ||
      (res.status === 403
        ? ' При авторизации произошла ошибка. Переданный токен некорректен.'
        : '') ||
      (res.status === 404
        ? ' 404 Страница по указанному маршруту не найдена.'
        : ''),
  });
};
const checkResponseProfile = (res) => {
  if (res.ok === true) {
    return res.json();
  }
  return Promise.reject({
    resStatus: res.status,
    resErrorMessage:
      (res.status === 500 ? '505 На сервере произошла ошибка.' : '') ||
      (res.status === 400 || 401 || 403
        ? 'При обновлении профиля произошла ошибка.'
        : '') ||
      (res.status === 404
        ? ' 404 Страница по указанному маршруту не найдена.'
        : ''),
  });
};

//регистрация signup
export const register = (name, email, password) => {
  return fetch(`${URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(checkResponseRegister);
};

//авторизация signin
export const authorize = (email, password) => {
  return fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponseLogin);
};

//проверка токена
export const checkToken = (token) => {
  return fetch(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

//Редактирование профиля
export const editProfile = (user) => {
  return fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  }).then(checkResponseProfile);
};

//Проверка токена у пользователя
export const getUser = () => {
  return fetch(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
};

////MOVIES////

//получить сохраненные фильмы
export const getAllCardsSaved = () => {
  return fetch(`${URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponse);
};

//добавить фильм в избранное
export const postCard = (card) => {
  return fetch(`${URL}/movies`, {
    method: 'POST',
    body: JSON.stringify({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: 'https://api.nomoreparties.co' + card.image.url,
      trailerLink: card.trailerLink,
      thumbnail:
        'https://api.nomoreparties.co' + card.image.formats.thumbnail.url,
      movieId: card.id,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
};

export const checkResponseDelete = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

//удалить фильм из избранного
export const deleteCard = (id) => {
  return fetch(`${URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(checkResponseDelete);
};
