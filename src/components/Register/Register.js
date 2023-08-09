import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import './Register.css';
import '../Header/Header.css';
import logo from '../../images/logo.svg';
import { EMAIL } from '../../utils/constants';

const Register = ({ onRegister, errorsFromApi }) => {
  const [changed, setChanged] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });

  function handleSubmitForm(formValues) {
    onRegister(formValues);
  }

  useEffect(() => {
    watch((value, { name, email, password }) => setChanged(true));
  }, [watch]);

  return (
    <section className='register'>
      <div className='register__container'>
        <Link to='/'>
          <img className='header__logo' src={logo} alt='логотип сайта кружок' />
        </Link>
        <h1 className='register__title'>Добро пожаловать!</h1>

        <form
          className='register__form'
          onSubmit={handleSubmit(handleSubmitForm)}
        >
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
            type='email'
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
          <div className='input__error-wrapper'>
            <p className='input__error message'>
              {errorsFromApi.register.resStatus
                ? errorsFromApi.register.resErrorMessage
                : ''}
            </p>
            <button
              className={
                errors?.name ||
                errors?.email ||
                errors?.password ||
                errorsFromApi.register.resStatus ||
                changed === false
                  ? 'register__button-off register__button'
                  : 'register__button button'
              }
              type='submit'
            >
              Зарегистрироваться
            </button>
          </div>
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
