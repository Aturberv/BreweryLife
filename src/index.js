import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import App from './App/App';
import config from '../config.json'
import BreweryPage from './BreweryPage/BreweryPage';
import 'babel-polyfill';
import Raven from 'raven-js';
import { Router, Route, browserHistory, IndexRedirect, Redirect } from 'react-router';
import './index.css';

ReactGA.initialize('UA-88592303-1');
Raven.config('https://c56bf372c3244e089766fb089d1fb85a@sentry.io/122382', 
    {
       whitelistUrls: [/https:\/\/brewery\.life.*/]
    }).install()

ReactDOM.render( 
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/nyc" />
        <Route path="/:city" component={App} onEnter={
            (nextState, replace) => 
                !(nextState.params.city in config.cities) &&
                // redirect to "we dont support that city yet" page
                replace('/nyc')
        }>
            <Route path=":breweryKey" component={BreweryPage} onEnter={
                (nextState, replace) =>
                !(nextState.params.breweryKey in config.cities[nextState.params.city].breweries) &&
                    // redirect to "contact us to add a brewery page"
                    replace(`/${nextState.params.city}`)
            }/>
        </Route>
        <Redirect from="*" to="/nyc/" />
    </Route>
  </Router>
  ,document.getElementById('root')
);
