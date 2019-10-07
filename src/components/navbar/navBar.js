
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import Logo from '../logo/logo';
import { logoutUser } from '../../actions/authAction';

class Header extends React.Component {
  onLogoutClick(e) {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.logoutUser();
  }

  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;

    const guestLink = (
      <header className="header uyu">
        <nav className="nav">
          <span className="logo lo">
            <Link to="/https://epic-mail04.herokuapp.com">
              <Logo />
            </Link>
          </span>
          <span className="help">
            <Link to="/inbox">Need help?</Link>
          </span>
        </nav>
      </header>
    );

    const authLink = (
      <header className="header header2 header4">
        <nav className="nav">
          <div className="flexboxx">
            <div className="logo bak">
              <Link to="/https://epic-mail04.herokuapp.com">
                <Logo />
              </Link>
              {' '}
            </div>
            <div className="search-container">
              <form action="#">
                <input type="text" placeholder="Search inbox.." name="search" className="bor" />
                <button type="submit" className="top-subb">
                  <i className="fa fa-search top-sub" />
                </button>
              </form>
            </div>
            <div className="userp">
              <FontAwesomeIcon icon={faUserCircle} className="top-us" />
              <div className="usern">username</div>
            </div>

            <button className="logout" type="submit" onClick={this.onLogoutClick.bind(this)}>
                logout
            </button>
          </div>
        </nav>
      </header>
    );
    return <div>{isAuthenticated ? authLink : guestLink}</div>;
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    root: PropTypes.string,
    isAuthenticated: PropTypes.bool,
  }),
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { logoutUser },
)(Header);
export { Header };
