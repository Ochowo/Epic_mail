/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const input = React.forwardRef((
  { id, className, type, name, placeholder, onChange, value },
  ref,
) => (
  <>
    <input
      id={id}
      className={className}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
    />
  </>
));

input.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default input;
