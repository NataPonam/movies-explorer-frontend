//Api для карточек фильмов
import { checkResponse } from './utils.js';

export const URL = 'https://api.nomoreparties.co/beatfilm-movies/';

export function getCards() {
  return fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}
