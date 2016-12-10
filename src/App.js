import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import Header from './Header';
import BreweryMarker from './BreweryMarker';
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
      defaultCenter: {lat: 40.7132859, lng: -73.9285485}
    }
    ReactGA.pageview('/');
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

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname !== nextProps.location.pathname) {
      ReactGA.pageview(nextProps.location.pathname)
    }
  }

  render() {
    // this is set by the URL
    const { breweryKey } = this.props.params;
    return (
      <div className="App">
        <Header onFilter={ this.filterBreweries }
                breweryKey={ breweryKey }/>
        {
          breweryKey && <BreweryPage brewery={ Breweries[breweryKey] }/>
        }
        <div className="App-map">
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY, language: 'en' }}
            defaultCenter={ this.state.defaultCenter }
            defaultZoom={ 12 }
          >
          {
            Object.keys(this.state.breweries).map((breweryKey) =>
                <BreweryMarker
                   key={ breweryKey }
                   lat={ Breweries[breweryKey].location.lat }
                   lng={ Breweries[breweryKey].location.lng }
                   breweryKey={ breweryKey }
                   brewery={ Breweries[breweryKey] }
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
