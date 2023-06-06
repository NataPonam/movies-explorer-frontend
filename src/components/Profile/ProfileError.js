import './Profile.css';
import React from 'react';
import HeaderMovie from '../Header/HeaderMovie';

function ProfileError() {
  const user = 'Наталья';
  const email = 'pochta@ya.ru';

  return (
    <>
      <HeaderMovie />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__title'>Привет, {user}!</h1>
          <form className='profile__form'>
            <div className='profile__form_wrapper'>
              <lable for='name' className='profile__lable'>
                Имя
              </lable>
              <input
                className='profile__input'
                name='name'
                id='name'
                value='Дима'
              ></input>
            </div>

            <div className='profile__input-line'></div>
            <div className='profile__form_wrapper'>
              <lable for='email' className='profile__lable'>
                E-mail
              </lable>
              <input
                className='profile__input'
                name='email'
                type='email'
                id='email'
                value={email}
              ></input>
            </div>
          </form>

          <p className='profile__text-error'>
            При обновлении профиля произошла ошибка
          </p>

          <button className='profile__save' disabled='true'>
            Сохранить
          </button>
        </div>
      </section>
    </>
  );
}
export default ProfileError;
