import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import BreweryMarker from './BreweryMarker';
import Breweries from './breweries';
import logo from './logo.svg';
import './App.css';

  const defaultProps = {
    center: {lat: 40.7245168, lng: -73.9275694},
    zoom: 12.27,
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
        >
        {
          Breweries.map((brewery) => 
            <BreweryMarker 
                           key={ brewery.name }
                           lat={ brewery.location.lat }
                           lng={ brewery.location.lng }
            />
          )
        }
        </GoogleMap>
        </div>
      </div>
    );
  }
}

export default App;
