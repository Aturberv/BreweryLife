import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import Header from '../Header/Header';
import BreweryMarker from '../BreweryMarker/BreweryMarker';
import BreweryPage from '../BreweryPage/BreweryPage';
import {geolocated} from 'react-geolocated';
import Cities from '../breweries.json';
import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import config from '../../config.json';
import './App.css';

const API_KEY = 'AIzaSyCG6SNlthILXRA7qZhcvNH5Wx6NL42gE8Y';
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
    console.log()
    this.state = {
      breweries: Cities[props.params.city],
      defaultCenter: {lat: 40.7132859, lng: -73.9285485}
    }
  }

  componentWillMount(){
    ReactGA.initialize('UA-88592303-1');
    window.ButtonWebConfig = {
      applicationId: 'app-760d46b2c04938db'
    };
    window['__bttnio'] = 'bttnio';
  }

  breweryNameFilter(breweryKeys) {
    if (breweryKeys.length === 0) {
      this.setState({breweries: Cities[this.props.params.city]});
      this.props.router.push(`'/${this.props.params.city}`);
    } else if (breweryKeys.length === 1) {
        this.props.router.push(`${this.props.params.city}/${breweryKeys[0]}`)
    } else {
      this.setState({
        breweries: Object.keys(Cities[this.props.params.city]).reduce((result, key) => {
          if(breweryKeys.indexOf(key) > -1) {
            result[key] = Cities[this.props.params.city][key]
          }
          return result
        }, {})
      });
      this.props.router.push(`'/${this.props.params.city}`);
    }
  }

  beerTypeFilter(beerTypes) {
    if (beerTypes.length === 0) {
      this.setState({breweries: Cities[this.props.params.city]});
    } else {
      this.setState({
        breweries: Object.keys(Cities[this.props.params.city]).reduce((result, key) => {
          const intersection = new Set(
              Cities[this.props.params.city][key].beerTypes
              .filter(type => beerTypes.indexOf(type) > -1))
          // we matched on all desired filters
          if(intersection.size === beerTypes.length) {
            result[key] = Cities[this.props.params.city][key];
          }
          return result;
        }, {})
      });
    }
  }

  ratingFilter(ratingEvent) {
    this.props.router.push(this.props.params.city);
    this.setState({
      breweries: Object.keys(Cities[this.props.params.city]).reduce((result, key) => {
        if(Cities[this.props.params.city][key].yelpRating >= ratingEvent) {
          result[key] = Cities[this.props.params.city][key];
        }
        return result;
      }, {})
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.city !== nextProps.params.city) {
      this.setState({
        breweries: Cities[nextProps.params.city]
      })
    }

    if(this.props.location.pathname !== nextProps.location.pathname) {
      ReactGA.pageview(nextProps.location.pathname)
    }
  }

  render() {
    const {
      params: {
        city,
        breweryKey
      },
      location: {
        pathname
      },
      coords
    } = this.props;

    const currentUrl = `${config.url}${pathname}`;
    const favIcon = `${config.url}/favicon.ico`;
    return (
      <div className="App">
        <Helmet
          defaultTitle="NYC Brewery Map"
          titleTemplate="%s - NYC Brewery Map"
          meta={[
            {name: "description", content: config.cities[city].description},
            {name: "keywords", content: config.cities[city].keywords},
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
                breweryKey={ breweryKey }
                city={ city }
                allCities={ config.cities }
                breweries={ Cities[city] }
        />
        {
          breweryKey && <BreweryPage brewery={ Cities[this.props.params.city][breweryKey] }
                                     isMobile={ isMobile }
                                     userCoordinates={ coords }/>
        }
        <div className="App-map">
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY, language: 'en' }}
            defaultCenter={ this.state.defaultCenter }
            center={ config.cities[city].map.center}
            zoom={ config.cities[city].map.zoom }
            defaultZoom={ 12 }
          >
          {
            Object.keys(this.state.breweries).map((breweryKey) =>
                <BreweryMarker
                   city={ city }
                   key={ breweryKey }
                   lat={ Cities[this.props.params.city][breweryKey].location.lat }
                   lng={ Cities[this.props.params.city][breweryKey].location.lng }
                   breweryKey={ breweryKey }
                   brewery={ Cities[this.props.params.city][breweryKey] }
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
    // can we figure out what city
    // based on their location?
    App = geolocated({
        positionOptions: {
            enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    })(App);  
}

export default App;
