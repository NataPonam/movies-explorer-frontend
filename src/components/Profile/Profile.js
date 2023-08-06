import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Profile.css';
import '../Register/Register.css';
import HeaderMovie from '../Header/HeaderMovie';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { EMAIL } from '../../utils/constants';

function Profile({
  onExit,
  onEditProfile,
  loggedIn,
  errorsFromApi,
  isReqSuccess,
  isMessageSuccess,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEdit, setIsEdit] = useState(false); //редактировано поле
  const [isShowBtn, setIsShowBtn] = useState(false); // показать кнопку СОХРАНИТЬ
  const inputCheck =
    isEdit === false ||
    (name === currentUser.name && email === currentUser.email);

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  function handleChangeName(e) {
    setName(e.target.value);
    setIsEdit(true);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    setIsEdit(true);
  }

  //нажата кнопка СОХРАНИТЬ, данные перезаписываются в апи
  function handleSubmitForm(e) {
    e.preventDefault();

    onEditProfile({
      name: name,
      email: email,
    });
    setIsShowBtn(false);
    setIsEdit(false);
  }

  //если нажата кнопка РЕДАКТИРОВАТЬ, покажи кнопку сохранить
  function handleEditBtnPushed(e) {
    e.preventDefault();
    setIsShowBtn(true); //показать кнопку СОХРАНИТЬ
  }

  //если ответ успешный, скрой кнопку сохранить
  useEffect(() => {
    if (isReqSuccess) {
      setIsShowBtn(false);
    }
  }, [isReqSuccess]);

  useEffect(() => {
    if (loggedIn) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [loggedIn, currentUser]);

  return (
    <>
      <HeaderMovie />
      <section className='profile'>
        <div className='profile__container'>
          <h1 className='profile__title'>Привет, {name}!</h1>

          <p
            className={
              isMessageSuccess ? 'profile-message' : 'profile-message close'
            }
          >
            Данные успешно обновлены
          </p>

          <form className='profile__form'>
            <div className='profile__form_wrapper'>
              <div
                className={
                  errors.name
                    ? 'profile__input  type-error'
                    : 'profile__input  wrapper'
                }
              >
                <lable for='name' className='profile__lable'>
                  Имя
                </lable>
                <input
                  name='name'
                  id='name'
                  value={name}
                  className={
                    errors.name
                      ? 'profile__input text-error '
                      : 'profile__input'
                  }
                  {...register('name', {
                    onChange: handleChangeName,
                    required: 'Поле обязательно для заполнения',
                    minLength: {
                      value: 2,
                      message: 'Минимум 2 символа',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Максимум 30 символов',
                    },
                  })}
                />
              </div>
              <span className='input__error-profile'>
                {errors?.name && (
                  <p className='input__error_text'>
                    {errors?.name?.message || 'Что-то пошло не так...'}
                  </p>
                )}
              </span>
            </div>
            <div className='profile__input-line'></div>
            <div className='profile__form_wrapper'>
              <div
                className={
                  errors.email
                    ? 'profile__input type-error'
                    : 'profile__input wrapper'
                }
              >
                <lable for='email' className='profile__lable'>
                  E-mail
                </lable>
                <input
                  name='email'
                  type='email'
                  id='email'
                  value={email}
                  className={
                    errors.email
                      ? 'profile__input text-error '
                      : 'profile__input'
                  }
                  {...register('email', {
                    onChange: handleChangeEmail,
                    required: 'Поле обязательно для заполнения',
                    pattern: {
                      value: EMAIL,
                      message: 'Введен некорректный адрес электронной почты',
                    },
                  })}
                />
              </div>
              <span className='input__error-profile'>
                {errors?.email && (
                  <p className='input__error_text'>
                    {errors?.email?.message || 'Что-то пошло не так...'}
                  </p>
                )}
              </span>
            </div>
          </form>

          {isReqSuccess === false && isShowBtn === false ? (
            <p className='input__error message'>
              {errorsFromApi.profile.resErrorMessage}
            </p>
          ) : (
            ''
          )}

          {isShowBtn === true && inputCheck ? (
            <p className='input__error message'>
              При обновлении профиля произошла ошибка
            </p>
          ) : (
            ''
          )}
          <>
            {isShowBtn === true ? (
              <button
                className='profile__save button active'
                onClick={handleSubmitForm}
                disabled={inputCheck}
              >
                Сохранить
              </button>
            ) : (
              <>
                <button
                  className='profile__edit button'
                  onClick={handleEditBtnPushed}
                >
                  Редактировать
                </button>
                <button className='profile__logout button ' onClick={onExit}>
                  Выйти из аккаунта
                </button>
              </>
            )}
          </>
        </div>
      </section>
    </>
  );
}
export default Profile;

/////////////
/*      <div
            className={`profile__box ${active ? 'active' : ''}`}
            active={active}
            setActive={setActive}
          >
            {isValid === false && isShowBtn === false ? (
              <p className='input__error message'>
                {errorsFromApi.profile.resErrorMessage}
              </p>
            ) : (
              ''
            )}
          </div> */
