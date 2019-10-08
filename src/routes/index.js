import React from 'react';
import { Switch as Router, Route, Redirect } from 'react-router-dom';
import Home from '../views/home/home';
import Inbox from '../views/Inbox/inbox';
import { PrivateRoute } from './privateRoute';

const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
    <PrivateRoute exact path="/inbox" component={Inbox} />
    <Redirect from="*" to="/" />
  </Router>
);
export default App;
