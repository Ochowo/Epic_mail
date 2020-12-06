import React from 'react';
import { Switch as Router, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { authSelector, setCurrentUser } from '../features/auth/authSlice';
import PrivateRoute from './privateRoute';
import Home from '../features/home/home';
import Inbox from '../features/messages/inbox';
import Sent from '../features/messages/sent';
import Draft from '../features/messages/draft';
import Trash from '../features/messages/trash';

const App = () => (
  <Router>
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/inbox" exact component={Inbox} />
    <PrivateRoute path="/sent" exact component={Sent} />
    <PrivateRoute path="/draft" exact component={Draft} />
    <PrivateRoute path="/trash" exact component={Trash} />
  </Router>
);
export default App;
