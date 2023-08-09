import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import '../Register/Register.css';
import '../Header/Header.css';
import { EMAIL } from '../../utils/constants';

import logo from '../../images/logo.svg';

function Login({ onLogin, errorsFromApi, loggedIn }) {
  const navigate = useNavigate();
  const [changed, setChanged] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    onLogin(data);
    // reset();
    setChanged(false);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    watch((value, { email, password }) => setChanged(true));
  }, [watch]);

  return (
    <section className='register'>
      <div className='register__container'>
        <Link to='/'>
          <img
            className='header__logo'
            src={logo}
            alt='логотип сайта кружок'
          ></img>
        </Link>
        <h1 className='register__title'>Рады видеть!</h1>

        <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
          <lable for='email' className='register__form_lable'>
            E-mail
          </lable>
          <input
            id='email'
            type='email'
            className={
              errors.email
                ? 'register__form_input type-error'
                : 'register__form_input'
            }
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: EMAIL || '',
                message: 'Введен некорректный адрес электронной почты',
              },
            })}
          />
          <span className='input__error'>
            {errors?.email && (
              <p className='input__error_text'>
                {errors?.email?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </span>
          <lable for='password' className='register__form_lable'>
            Пароль
          </lable>
          <input
            id='password'
            type='password'
            className={
              errors.password
                ? 'register__form_input type-error'
                : 'register__form_input'
            }
            {...register('password', {
              required: 'Поле обязательно для заполнения',
            })}
          />
          <span className='input__error'>
            {errors?.password && (
              <p className='input__error_text'>
                {errors?.password?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </span>
          <div className='input__error-wrapper'>
            <p className='input__error message'>
              {errorsFromApi.authorize.resStatus && changed === false
                ? errorsFromApi.authorize.resErrorMessage
                : ''}
            </p>
            <button
              className={
                errors?.email ||
                errors?.password ||
                errorsFromApi.authorize.resStatus ||
                changed === false
                  ? 'register__button-off register__button'
                  : 'register__button button'
              }
              type='submit'
            >
              Войти
            </button>
          </div>
        </form>
        <div className='register__box'>
          <p className='register__text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='register__link link'>
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
