import React from 'react';
import { Switch as Router, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { authSelector, setCurrentUser } from '../features/auth/authSlice';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(authSelector);
  return (
    <Route
      {...rest}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      ))}
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export default PrivateRoute;
