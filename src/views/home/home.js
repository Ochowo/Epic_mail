import React, { Fragment } from 'react';

import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../actions/authAction';
import Navbar from '../../components/navbar/navBar';
import Landing from '../../components/landing/landing';
import Footer from '../../components/footer/footer';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends React.Component {
  render() {
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      return <Redirect to="/inbox" />;
    }
    return (
      <Fragment>
        <Navbar />
        <Landing />
        <Footer />
      </Fragment>
    );
  }
}
HomePage.propTypes = {
  history: PropTypes.shape({
    root: PropTypes.string,
    push: PropTypes.func,
  }),
  auth: PropTypes.shape({
    root: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerAction: register,
  },
  dispatch,
);
const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(HomePage));
export default Home;
export { HomePage };
