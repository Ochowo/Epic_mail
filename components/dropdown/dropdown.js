/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import './dropdown.scss';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { logoutUser } from '../../features/auth/authSlice';

const Dropdown = ({ name, email }) => {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className="dropdown" style={{ width: '200px' }}>
      <button className="buttonn" type="button" onClick={() => setDropdown(!dropdown)}> My Profile </button>

      { dropdown ? (
        <ul className="drp-ul">
          <li><FontAwesomeIcon icon={faUserCircle} className="top-us" size="5x"/></li>
          <li>
            {name}

          </li>
          <li>{email}</li>
          <li className="dripp">
            {' '}
            <button
              className="logout"
              type="submit"
              onClick={() => dispatch(logoutUser())}
            >
              logout
            </button>
          </li>
        </ul>
      )
        : (
          null
        )}

    </div>

  );
};
Dropdown.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
};
export default Dropdown;
