import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddGood from './components/AddGood';
import ChangeGood from './components/ChangeGood';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/add' component={AddGood} />
    <Route path='/change' component={ChangeGood} />
  </Route>
);
