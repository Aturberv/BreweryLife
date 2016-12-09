import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import BreweryMarker from './BreweryMarker';
import BreweryFilter from './BreweryFilter';
import BreweryPage from './BreweryPage';
import Breweries from './breweries.json';
import ReactGA from 'react-ga';

import './App.css';

const API_KEY = 'AIzaSyCG6SNlthILXRA7qZhcvNH5Wx6NL42gE8Y';

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this)
    this.state = {
      breweries: Breweries,
      brewery: null,
      defaultCenter: {lat: 40.7132859, lng: -73.9285485}
    }
  }

  filterBreweries(type, value) {
    
    this.setState({
      breweries: Object.entries(Breweries).reduce((result, [breweryName, brewery]) => {
        switch(typeof (value)){
          case 'number':
            if(brewery[type] >= value){
              result[breweryName] = brewery
            }
            break;
          case 'string':
            if(brewery[type].toLowerCase().includes(value.toLowerCase())){
              result[breweryName] = brewery
            }
            break;
          default:
            return result;
        }
        return result;
      }, {})
    });
  }

  trackBreweryView(breweryName) {
    breweryName ?
        ReactGA.modalview(breweryName)
      : ReactGA.pageview('/') && ReactGA.event({
          category: 'Modal',
          action: 'Closed',
          label: breweryName
        });
  }

  selectBrewery(breweryName) {
    this.setState({
      brewery: this.state.breweries[breweryName]
    });
    this.trackBreweryView(breweryName);
  }

  render() {
    return (
      <div className="App">
        <BreweryFilter onFilter={ this.filterBreweries }
                       brewery={ this.state.brewery }
                       closeBrewery={ () => this.selectBrewery(null) } /> 
        <div>
        {
          this.state.brewery &&
            <div className="brewery-page">
              <BreweryPage closeBrewery={ () => this.selectBrewery(null) }
                           brewery={this.state.brewery}
              />
            </div>
        }
        <div className="App-map">
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY, language: 'en' }}
            defaultCenter={ this.state.defaultCenter }
            defaultZoom={ 12 }
            onChildClick={ this.selectBrewery }
          >
          {
            Object.entries(this.state.breweries).map(([breweryName, brewery]) => 
              <BreweryMarker 
                 key={ breweryName }
                 lat={ brewery.location.lat }
                 lng={ brewery.location.lng }
                 brewery={ brewery }
              />
            )
          }
          </GoogleMap>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
