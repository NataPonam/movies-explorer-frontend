import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import HeaderMovie from '../Header/HeaderMovie';

function Profile() {
  const user = 'Наталья';
  const email = 'pochta@ya.ru';

  const [active, setActive] = useState(false);

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
                value={user}
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
          <div
            className={`profile__box ${active ? 'active' : ''}`}
            active={active}
            setActive={setActive}
          >
            <button
              className='profile__edit button'
              onClick={() => setActive(!active)}
            >
              Редактировать
            </button>

            <Link to='/signup' className='profile__logout link'>
              Выйти из аккаунта
            </Link>
          </div>
          <button
            active={active}
            setActive={setActive}
            className={`profile__save button ${active ? 'active' : ''}`}
          >
            Сохранить
          </button>
        </div>
      </section>
    </>
  );
}
export default Profile;
