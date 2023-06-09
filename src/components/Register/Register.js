import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './Register.css';
import '../Header/Header.css';
import { EMAIL } from '../../utils/constants';

import logo from '../../images/logo.svg';
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
    reset();
  };
  return (
    <section className='register'>
      <div className='register__container'>
        <img className='header__logo' src={logo} alt='логотип сайта кружок' />
        <h1 className='register__title'>Добро пожаловать!</h1>

        <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
          <lable for='name' className='register__form_lable'>
            Имя
          </lable>
          <input
            id='name'
            className={
              errors.name
                ? 'register__form_input type-error'
                : 'register__form_input'
            }
            {...register('name', {
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
          <span className='input__error'>
            {errors?.name && (
              <p className='input__error_text'>
                {errors?.name?.message || 'Что-то пошло не так...'}
              </p>
            )}
          </span>
          <lable for='email' className='register__form_lable'>
            E-mail
          </lable>
          <input
            id='email'
            //type='email'
            className={
              errors.email
                ? 'register__form_input type-error'
                : 'register__form_input'
            }
            {...register('email', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value: EMAIL,
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

          <button className='register__button button' type='submit'>
            Зарегистрироваться
          </button>
        </form>

        <div className='register__box'>
          <p className='register__text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='register__link link'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;

/**/
