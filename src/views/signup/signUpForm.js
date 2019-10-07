import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/logo/logo';
import InputField from '../../components/input/input';
import Heading from '../../components/title/title';

const SignUpForm = ({
  onSubmit, onChange, authError, valError, refreshPage,
}) => (
  <Fragment>
    <form name="epic-sign" className="box bxx sign-form" onSubmit={onSubmit}>
      <Logo />
      <Heading title="Register on Epic Mail" />
      {authError && <div className="feedback">{authError}</div>}
      <InputField
        id="fname"
        className="input name1 name2"
        type="text"
        placeholder="First name"
        name="firstName"
        onChange={onChange}
      />
      {valError && <div className="feedback">{valError.firstName}</div>}
      <br />
      <InputField
        className="input name1 name2"
        id="lname"
        type="text"
        placeholder="Last name"
        name="lastName"
        onChange={onChange}
      />
      {valError && <div className="feedback">{valError.lastName}</div>}
      <br />
      <InputField
        id="ename"
        className="input name1 email2"
        type="text"
        placeholder="Enter Email"
        name="email"
        onChange={onChange}
      />
      {valError && <div className="feedback">{valError.email}</div>}
      <br />
      <InputField
        className="input submit name1 pass2"
        id="pname"
        type="password"
        placeholder="Enter Password"
        name="password"
        onChange={onChange}
      />
      {valError && <div className="feedback">{valError.password}</div>}
      <br />
      <InputField
        className="input submit name1 cpass2"
        id="cname"
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={onChange}
      />
      {valError && <div className="feedback">{valError.confirmPassword}</div>}
      <br />
      <InputField type="submit" className="logbtn" value="Sign up" />
      <button
        className="create name3"
        id="sigg"
        type="button"
        onClick={refreshPage}
      >
              Login
      </button>
    </form>
  </Fragment>
);
SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  valError: PropTypes.shape({
    status: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  refreshPage: PropTypes.func,
  authError: PropTypes.string,
};
export default (SignUpForm);
