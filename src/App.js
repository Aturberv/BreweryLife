import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import BreweryMarker from './BreweryMarker';
import BreweryFilter from './BreweryFilter';
import Breweries from './breweries';
import './App.css';

const defaultProps = {
    center: {lat: 40.7945168, lng: -73.9275694},
    zoom: 11,
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
          case 'string':
            return brewery[type].toLowerCase().includes(value.toLowerCase())
          default:
            return true;
        }
        
      })
    });
  }

  render() {
    return (
      <div className="App">
        <BreweryFilter onFilter={ this.filterBreweries } /> 
        <div className="App-map">
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
                             brewery={ brewery }
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
