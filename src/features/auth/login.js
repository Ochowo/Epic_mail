import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { authentication, authSelector } from './authSlice';
import Input from '../../components/input/input';
import Title from '../../components/title/title';
import Logo from '../../components/logo/logo';
import './auth.scss';

const Login = ({ swapForm }) => {
  const { error } = useSelector(authSelector);
  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const loginData = {
    email: '',
    password: '',
  };

  const { isLoading } = useSelector(authSelector);
  const [loginState, setLoginState] = useState(loginData);
  const dispatch = useDispatch();

  async function submitLogin() {
    const path = 'signin';
    await dispatch(authentication(path, loginState));
  }

  function handleLoginStateChange(event) {
    const { name, value } = event.target;

    setLoginState({ ...loginState, [name]: value });
  }
  return (
    <form className="box bxx sign-form" onSubmit={handleSubmit(submitLogin)}>
      <Logo />
      <Title text="Sign in to use Epic Mail" />
      <Input placeholder="Enter your email" className="input email top-input" name="email" type="email" value={loginState.email} onChange={handleLoginStateChange} ref={register} />
      <br />
      {errors.email && <div className="invalid-fb">{errors.email.message}</div> }
      <Input placeholder="Enter your password" className="input password" name="password" type="password" value={loginState.password} onChange={handleLoginStateChange} ref={register} />
      <br />
      {errors.password && <div className="invalid-fb">{errors.password.message}</div> }
      <button type="submit" className="logbtn">
        {isLoading ? (

          'Loading...'

        ) : 'Login' }
      </button>
      <div className="acct" id="forg" role="presentation">
        Forgot Password
      </div>
      <button type="button" className="create" id="loggg" onClick={swapForm}>
        {' '}
        Create an account
      </button>
    </form>
  );
};

Login.propTypes = {
  swapForm: PropTypes.func,
};

export default Login;
