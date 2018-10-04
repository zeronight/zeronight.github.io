import 'normalize.css';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import Home from './containers/home';
import Article from './containers/article';

const content = (
  <Router>
    <Switch>
      <Route exact={true} path="/" component={Home}/>
      <Route path="/articles/:article" component={Article}/>
    </Switch>
  </Router>
);

const container = document.getElementById('app');

ReactDOM.render(content, container);
