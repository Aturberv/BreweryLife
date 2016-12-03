import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import BreweryMarker from './BreweryMarker';
import BreweryFilter from './BreweryFilter';
import Breweries from './breweries';
import logo from './logo.svg';
import './App.css';

  const defaultProps = {
    center: {lat: 40.7245168, lng: -73.9275694},
    zoom: 12,
  };

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this)
    this.state = {
      breweries: Breweries
    }
  }

  filterBreweries(type, value) {
    
    this.setState({
      breweries: Breweries.filter((brewery) => {
        switch(typeof (value)){
          case 'number':
            return brewery[type] >= value;
            break;  
          case 'string':
            return brewery[type].toLowerCase().includes(value.toLowerCase())
            break;
          default:
            break;
        }
        
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-map">
        <BreweryFilter onFilter={ this.filterBreweries } />
        <GoogleMap
            defaultCenter={ defaultProps.center}
            defaultZoom={ defaultProps.zoom }

        >
        {
          this.state.breweries.map((brewery) => 
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
