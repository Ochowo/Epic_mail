/* eslint-disable import/no-cycle */
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../../actions/authAction';
import validateSignupInput from '../../validator/validateSignup';
import SignUpForm from './signUpForm';
import SignIn from '../signin/signIn';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentDidUpdate(prevProps) {
    const { history, auth } = this.props;
    if (auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      history.push('/inbox');
    }
  }


  onChange(e) {
    const { name } = e.target;
    const { value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = this.state;
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

  registerForm() {
    this.setState({ signup: false });
  }

  render() {
    const { auth } = this.props;
    const { error } = auth;
    const { signup, firstName, lastName, userName, email, password, confirmPassword } = this.state;
    const newUser = {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
    };
    let valError;
    let authError;
    if (error && error.status === 400) {
      const { validationErrors } = validateSignupInput(newUser);
      valError = validationErrors;
    } else {
      authError = error;
    }
    if (signup) {
      return (
        <SignUpForm
          onSubmit={e => this.onSubmit(e)}
          onChange={e => this.onChange(e)}
          valError={valError}
          authError={authError}
          refreshPage={() => this.registerForm()}
        />
      );
    }
    return <SignIn />;
  }
}
SignUp.propTypes = {
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

export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerAction: register,
  },
  dispatch,
);
const signUpPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SignUp));
export default signUpPage;
export { SignUp };
