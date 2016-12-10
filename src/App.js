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

  autocompleteFilter(breweryKeys) {
    if (breweryKeys.length === 0) {
      this.setState({breweries: Breweries});
      this.props.router.push('/');
    } else if (breweryKeys.length === 1) {
        this.props.router.push(`/${breweryKeys[0]}`)
    } else {
      this.setState({
        breweries: Object.keys(Breweries).reduce((result, key) => {
          if(breweryKeys.indexOf(key) > -1) {
            result[key] = Breweries[key]
          }
          return result
        }, {})
      });
      this.props.router.push('/');
    }
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
        <Header autocompleteFilter={this.autocompleteFilter}
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
