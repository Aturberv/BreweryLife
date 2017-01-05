import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import config from '../config.json'
import BreweryPage from './BreweryPage/BreweryPage';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import './index.css';

ReactDOM.render( 
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRedirect to="/nyc" />
        <Route path="/:city" component={App} onEnter={
            (nextState, replace) => 
                !(nextState.params.city in config.cities) &&
                // redirect to "we dont support that city yet page"
                replace('/nyc')
        }>
            <Route path=":breweryKey" component={BreweryPage} onEnter={
                (nextState, replace) =>
                !(nextState.params.breweryKey in config.cities[nextState.params.city].breweries) &&
                    // redirect to "contact us to add a brewery page"
                    replace(`/${nextState.params.city}`)
            }/>
        </Route>
    </Route>
  </Router>
  ,document.getElementById('root')
);
