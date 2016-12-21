import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import App from './App';
import BreweryPage from './BreweryPage/BreweryPage';
import { Router, Route, browserHistory } from 'react-router';
import './index.css';

ReactGA.initialize('UA-88592303-1');
ReactGA.pageview('/');

ReactDOM.render( 
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="/:breweryKey" component={BreweryPage}/>
    </Route>
  </Router>
  ,document.getElementById('root')
);
