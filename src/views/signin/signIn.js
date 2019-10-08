/* eslint-disable import/no-cycle */
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';

import Logo from '../../components/logo/logo';
import InputField from '../../components/input/input';
import Heading from '../../components/title/title';
import validateSigninInput from '../../validator/validateSignup';
// eslint-disable-next-line import/no-cycle
import SignUp from '../signup/signup';
import ResetPassword from '../resetpassword/resetPassword';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      email: '',
      password: '',
      reset: false,
    };
  }

  onChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }


  onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    console.log(this.props);
    const { registerAction, history } = this.props;

    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    registerAction(user, history);
  }

  resetForm() {
    this.setState({ reset: true });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.auth.isAuthenticated) {
      history.push('/inbox');
    }
  }

  showForm() {
    this.setState({ show: false });
  }

  render() {
    const { auth } = this.props;
    const { error } = auth;
    const { show, reset, email, password } = this.state;
    const newUser = {
      email,
      password,
    };
    let valError;
    let authError;
    if (error) {
      if (error.status === 400) {
        const { validationErrors } = validateSigninInput(newUser);
        valError = validationErrors;
      } else {
        authError = error;
      }
    }
    if (show && reset) {
      return <ResetPassword />;
    }
    if (!show && !reset) {
      return <SignUp />;
    }
    return (
      <Fragment>
        <form name="epic-sign" className="bxx box" id="bxx" onSubmit={e => this.onSubmit(e)}>
          <Logo />
          <Heading title="Sign in to use Epic Mail" />
          {authError && <div className="feedback">{authError}</div>}
          <InputField
            className="input email3"
            id="email3"
            type="text"
            name="email"
            placeholder="Enter your email here"
            onChange={e => this.onChange(e)}
          />
          {valError && <div className="feedback">{valError.email}</div>}
          <InputField
            className="input pass3"
            id="pass3"
            type="password"
            name="password"
            placeholder="Enter your password here"
            onChange={e => this.onChange(e)}
          />
          {valError && <div className="feedback">{valError.password}</div>}
          <InputField type="submit" className="logbtn" value="Login" />
          <div className="acct" id="forg" onClick={this.resetForm} role="presentation">
            Forgot Password
          </div>
          <button type="button" className="create" id="loggg" onClick={() => this.showForm()}>
            {' '}
            Create an account
          </button>
        </form>
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  registerAction: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  registerAction: login,
};
const signInPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SignIn));
export default signInPage;
export { SignIn };
