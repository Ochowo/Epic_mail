/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import LogoImg from '../../../public/images/logo.svg';
import './logo.scss';

const Logo = () => (
  <span className="logo-box">
    <img src={LogoImg} alt="Logo" />
  </span>
);
export default Logo;
