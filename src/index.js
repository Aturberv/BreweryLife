import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactGA.initialize('UA-88592303-1');
ReactGA.pageview('/');

ReactDOM.render(  
  <App />,
  document.getElementById('root')
);
