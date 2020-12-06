import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSelector } from './authSlice';

import Login from './login';
import Signup from './signup';
import './auth.scss';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();
  const { isAuthenticated, error, hasErrors } = useSelector(authSelector);

  toast.configure();
  const showToast = () => {
    toast.error(error.message, {
      position: toast.POSITION.TOP_RIGHT,

    });
  };

  setTimeout(() => {
    if (isAuthenticated) {
      history.push('/inbox');
    }
  }, 1000);

  const toggleDisplay = () => {
    setIsLogin(false);
  };
  const toggle2Display = () => {
    setIsLogin(true);
  };
  useEffect(() => {
    if (hasErrors) {
      showToast();
    }
  }, []);
  return (
    isLogin ? (
      <Login swapForm={toggleDisplay} />
    ) : (

      <Signup swapForm={toggle2Display} />
    )
  );
};

export default Auth;
