import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import Header from '../Header/Header';
import BreweryMarker from '../BreweryMarker/BreweryMarker';
import BreweryPage from '../BreweryPage/BreweryPage';
import {geolocated} from 'react-geolocated';
import Breweries from '../breweries.json';
import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import config from '../../config.json';
import './App.css';

const API_KEY = 'AIzaSyCG6SNlthILXRA7qZhcvNH5Wx6NL42gE8Y';
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

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

  componentWillMount(){
    window.ButtonWebConfig = {
      applicationId: 'app-760d46b2c04938db'
    };
    window['__bttnio'] = 'bttnio';
  }

  breweryNameFilter(breweryKeys) {
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

  beerTypeFilter(beerTypes) {
    if (beerTypes.length === 0) {
      this.setState({breweries: Breweries});
    } else {
      this.setState({
        breweries: Object.keys(Breweries).reduce((result, key) => {
          const intersection = new Set(
              Breweries[key].beerTypes
              .filter(type => beerTypes.indexOf(type) > -1))
          // we matched on all desired filters
          if(intersection.size === beerTypes.length) {
            result[key] = Breweries[key];
          }
          return result;
        }, {})
      });
    }
  }

  ratingFilter(ratingEvent) {
    this.props.router.push('/');
    this.setState({
      breweries: Object.keys(Breweries).reduce((result, key) => {
        if(Breweries[key].yelpRating >= ratingEvent) {
          result[key] = Breweries[key];
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
    const { pathname } = this.props.location;
    const { coords } = this.props;
    const currentUrl = `${config.url}${pathname}`;
    const favIcon = `${config.url}/favicon.ico`;
    return (
      <div className="App">
        <Helmet
          defaultTitle="NYC Brewery Map"
          titleTemplate="%s - NYC Brewery Map"
          meta={[
            {name: "description", content: config.description},
            {name: "keywords", content: config.keywords},
            {}
          ]}
          link={[
            {rel:"alternate", hreflang:"en", href:currentUrl},
            {rel:"canonical", itemprop:"url", href:currentUrl},
            {rel:"shortcut icon", href:favIcon},
            {rel:"apple-touch-icon", href:favIcon},
            {rel:"apple-touch-icon", sizes:"160x160", href:favIcon},
          ]}
          script={[
            {src: "https://web.btncdn.com/v1/button.js", async:undefined, defer:undefined},
            {type: "application/ld+json", innerHTML: `{"@context": "http://schema.org","@type": "Organization","url": "${config.url}","logo": "${favIcon}"}`}

          ]}
        />
        <Header breweryNameFilter={this.breweryNameFilter}
                beerTypeFilter={this.beerTypeFilter}
                ratingFilter={this.ratingFilter}
                breweryKey={ breweryKey }/>
        {
          breweryKey && <BreweryPage brewery={ Breweries[breweryKey] }
                                     isMobile={ isMobile }
                                     userCoordinates={ coords }/>
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


if(isMobile) {
    App = geolocated({
        positionOptions: {
            enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    })(App);  
}

export default App;
