import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const InputField = ({ id, className, type, name, placeholder, onChange, value }) => (
  <Fragment>
    <input
      id={id}
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </Fragment>
);

InputField.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputField;
