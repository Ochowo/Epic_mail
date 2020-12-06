/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

export const Title = ({ text }) => <h2 className="heading">{text}</h2>;
Title.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Title;
