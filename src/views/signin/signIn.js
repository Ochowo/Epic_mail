import React, { Fragment } from 'react';
import classnames from 'classnames';
import Logo from '../../components/logo/logo';
import InputField from '../../components/input/input';
import Heading from '../../components/title/title';
// eslint-disable-next-line import/no-cycle
import SignUp from '../signup/signup';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      email: '',
      password: '',
    };
  }

  showForm() {
    this.setState({ show: false });
  }

  render() {
    const { show, email, password } = this.state;
    if (!show) {
      return <SignUp />;
    }
    return (
      <Fragment>
        <form name="epic-sign" className="bxx box" id="bxx" onSubmit={this.onSubmit}>
          <Logo />
          <Heading title="Sign in to use Epic Mail" />
          <InputField
            className={classnames('input email3')}
            id="email3"
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email here"
            onChange={e => this.onChange(e)}
          />
          <InputField
            className={classnames('input pass3')}
            id="pass3"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password here"
            onChange={e => this.onChange(e)}
          />
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
export default SignIn;
export { SignIn };
