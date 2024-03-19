import React from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from './Home';
import Search from './Search';

import './App.css';

const Footer = () => {
  return (
    <div className='border-top text-secondary px-5 py-2'>
      Build by <a target='_blank' href='https://akaneotake-portfolio.netlify.app'>Akane Otake</a>
      <span className='float-end'>favicon by <a target='_blank' href='https://icons8.com'>Icons8</a></span>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
      <Footer />
    </Router>
      );
};

export default App;
