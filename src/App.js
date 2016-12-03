import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import logo from './logo.svg';
import './App.css';

  const defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  };

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-map">
        <GoogleMap
            defaultCenter={ defaultProps.center}
            defaultZoom={ defaultProps.zoom }
        />
        </div>
      </div>
    );
  }
}

export default App;
