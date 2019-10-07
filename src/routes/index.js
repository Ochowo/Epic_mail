import React from 'react';
import { Switch as Router, Route } from 'react-router-dom';
import Home from '../views/home/home';

const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);
export default App;
