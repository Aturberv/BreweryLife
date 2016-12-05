import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import BreweryMarker from './BreweryMarker';
import BreweryFilter from './BreweryFilter';
import breweries from './breweries.json';
import './App.css';

const Breweries = breweries.Breweries;
const API_KEY = 'AIzaSyCG6SNlthILXRA7qZhcvNH5Wx6NL42gE8Y';

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
            bootstrapURLKeys={{ key: API_KEY, language: 'en' }}
              defaultCenter={ {lat: 40.7132859, lng: -73.9285485} }
              defaultZoom={ 12 }

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
