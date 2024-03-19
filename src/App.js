import React from 'react';
// Routerいる？
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Template from './Template';
import Home from './Home';
import Search from './Search';

import './App.css';

function App() {
  return (
    <Router>
      <Template>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
        </Switch>
      </Template>
    </Router>
      );
};

export default App;
