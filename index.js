import { Provider, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import React from 'react';
import store from './store/index';
import Routes from './routes/index';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './features/auth/authSlice';


import '../public/style/style.scss';

const App = () => <Routes />;

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwtDecode(localStorage.token);
  store.dispatch(setCurrentUser(decoded));
}
// const dispatch = useDispatch();
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
//   const decoded = jwtDecode(localStorage.token);
//   console.log(decoded, 'decoded');
//   dispatch(setCurrentUser(decoded));
// }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
