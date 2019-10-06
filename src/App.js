import React from 'react';

import './App.scss';
import {  BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './views/login/index'
import Register from './views/register/index'
import Main from './views/main/index'

function App() {
  return (
    <div id="App">
      <Router>
        <Route path="/">
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/main" component={Main}></Route>
        </Route>
      </Router>
    </div>
  );
}

export default App;
