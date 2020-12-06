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

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('First name is required'),
  email: yup.string().email('Please enter a valid email'),
  password: yup.string(),
});

const Signup = ({ swapForm }) => {
  const signupData = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    mobileNumber: '',
    password: '',
  };
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const { isLoading } = useSelector(authSelector);
  const [signupState, setSignupState] = useState(signupData);
  const dispatch = useDispatch();
  console.log(signupState);
  async function submitSignup() {
    const path = 'signup';
    await dispatch(authentication(path, signupState));
  }

  function handleSignupStateChange(event) {
    const { name, value } = event.target;
    const val = value.replace(/\s/g, '');
    setSignupState({ ...signupState, [name]: val });
  }
  return (
    <form className="box bxx" onSubmit={handleSubmit(submitSignup)}>
      <Logo />
      <Title text="Register on Epic Mail" />
      <Input className="input fname top-input" placeholder="Enter your first name" name="firstName" type="text" value={signupState.firstName} onChange={handleSignupStateChange} ref={register} />
      {errors.firstName && <div className="invalid-fb">{errors.firstName.message}</div>}
      <Input className="input lname" placeholder="Enter your last name" name="lastName" type="text" value={signupState.lastName} onChange={handleSignupStateChange} ref={register} />
      {errors.lastName && <div className="invalid-fb">{errors.lastName.message}</div>}
      <Input className="input email" placeholder="Enter your email" name="email" type="email" value={signupState.email} onChange={handleSignupStateChange} />
      {errors.email && <div className="invalid-fb">{errors.email.message}</div> }
      <Input className="input password" placeholder="Enter your password" name="password" type="password" value={signupState.password} onChange={handleSignupStateChange} ref={register} />
      {errors.password && <div className="invalid-fb">{errors.password.message}</div> }
      <button type="submit" className="logbtn">
        {isLoading ? (

          'Loading...'

        ) : 'Sign up' }
      </button>
      <button
        className="create name3"
        id="sigg"
        type="button"
        onClick={swapForm}
      >
        Login
      </button>
    </form>
  );
};

Signup.propTypes = {
  swapForm: PropTypes.func,
};

export default Signup;
