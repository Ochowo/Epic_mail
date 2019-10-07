import React from 'react';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './routes/index';
import './public/style/index.css';
import store from './store';
import { signupSuccess, logoutUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwtDecode(localStorage.token);
  store.dispatch(signupSuccess(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // redirect to login
    window.location.href = '/';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
