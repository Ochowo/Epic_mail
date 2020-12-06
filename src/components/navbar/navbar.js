import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from '../dropdown/dropdown';
import Logo from '../logo/logo';
import { authSelector } from '../../features/auth/authSlice';

import './navbar.scss';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(authSelector);
  console.log(user, 'user')
  const renderNavBar = () => {
    const guestLink = (
      <header className="header uyu">
        <nav className="nav">
          <span className="logo lo">
            <Link to="/https://epic-mail0007.herokuapp.com">
              <Logo />
            </Link>
          </span>
          <span className="help">
            <Link to="/inbox">Need help?</Link>
          </span>
        </nav>
      </header>
    );


    return isAuthenticated ? (
      <header className="header header2 header4">
        <nav className="nav">
          <div className="flexboxx">
            <div className="logo bak">
              <Link to="/https://epic-mail007.herokuapp.com">
                <Logo />
              </Link>
              {' '}
            </div>
            <div className="search-container">
              <form action="#">
                <input type="text" placeholder="Search inbox.." name="search" className="bor" />
              </form>
            </div>
            <div className="userp">
              <Dropdown name={`Hi ${user.firstName} ${user.lastName}`} email={user.email} />

            </div>

          </div>
        </nav>
      </header>
    ) : guestLink;
  };
  return (
    <div>
      {renderNavBar()}
    </div>
  );
};

export default NavBar;
