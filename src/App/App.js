/* global FB */

import ReactGA from 'react-ga';
import Helmet from 'react-helmet';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

import Header from '../Header/Header';
import BreweryPage from '../BreweryPage/BreweryPage';
import BreweryMap from '../BreweryMap/BreweryMap';
import Footer from '../Footer/Footer';

import Cities from '../breweries.json';
import config from '../../config.json';

import './bootstrap.css';
import './App.css';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      breweries: Cities[props.params.city],
      defaultCenter: config.cities[props.params.city].map.center,
      userCoords: this.props.userCoords,
      isLoggedIn: false,
      fbInit: false
    }
    window.fbAsyncInit = this.facebookInit;
    window.fbLogin = this.getFacebookInfo;
  }

  facebookInit() {
    FB.init({
      appId      : '744534482367485',
      xfbml      : true,
      status     : true,
      cookie     : true,
      version    : 'v2.7'
    });
    this.setState({fbInit:true});
    FB.getLoginStatus(this.getFacebookInfo);
  }

  getFacebookInfo(fbResponse) {
    if (fbResponse.authResponse && fbResponse.status === 'connected') {
      this.setState({
        isLoggedIn: true
      });
      // FB.api('/me', {fields:'name, email'}, function(resp) {
      //   TODO: send email to third party service?
      // });
    } else {
      this.setState({
        isLoggedIn:false
      });
    }
  }

  onFilterChanged(filters) {
    // there must be a better way to chain these!
    let filteredBreweries = Cities[this.props.params.city];
    filteredBreweries = this.breweryNameFilter(filteredBreweries, filters.breweryNamesSelected);
    filteredBreweries = this.beerTypeFilter(filteredBreweries, filters.beerTypesSelected);
    filteredBreweries = this.ratingFilter(filteredBreweries, filters.rating);
    filteredBreweries = this.openFilter(filteredBreweries, filters.openNow);
    this.setState({
      breweries: filteredBreweries
    });
  } 

  breweryNameFilter(breweries, breweryKeys) {
    if (breweryKeys.length === 0) {
      return breweries;
    }
    return Object.keys(breweries).reduce((result, key) => {
      if(breweryKeys.indexOf(key) > -1) {
        result[key] = breweries[key]
      }
      return result;
    }, {});
  }

  beerTypeFilter(breweries, beerTypes) {
    if (beerTypes.length === 0) {
      return breweries;
    } 
    return Object.keys(breweries).reduce((result, key) => {
      const intersection = new Set(breweries[key].beerTypes.filter(type => beerTypes.indexOf(type) > -1))
      // this brewery has all requested beer types
      if(intersection.size === beerTypes.length) {
        result[key] = breweries[key];
      }
      return result;
    }, {});
  }

  ratingFilter(breweries, rating) {
    return Object.keys(breweries).reduce((result, key) => {
      if(breweries[key].breweryRating.untappd.rating >= rating ||
         (!breweries[key].breweryRating.untappd.rating && rating <= 4))
         // ugh, for those without an untappd rating we want to show them
         // when searched for
      {
        result[key] = breweries[key];
      }
      return result;
    }, {})
  }

  openFilter(breweries, checked) {
    if(!checked) return breweries;

    const now = new Date();
    return Object.keys(breweries).reduce((result, key) => {
      const brewery = breweries[key];

      // this brewery doesn't have hours information
      if(!brewery.brewInfo ||
         !brewery.brewInfo.hours ||
         brewery.brewInfo.hours.length === 0) {
        return result;
      }

      brewery.brewInfo.hours.forEach((day)=> {
        if(now.getDay() === day.open.day ||
           now.getDay() === day.close.day) {
          // this brewery has hours today

          const openTime = new Date(now)
          const openHours = parseInt(day.open.time.slice(0, 2), 10);
          const openMinutes = parseInt(day.open.time.slice(-2), 10);
          openTime.setHours(openHours, openMinutes);
          const closeTime = new Date(now);
          const closeHours = parseInt(day.close.time.slice(0, 2), 10);
          const closeMinutes = parseInt(day.close.time.slice(-2), 10);
          closeTime.setHours(closeHours, closeMinutes);
          if(day.close.day > day.open.day ||
            (day.open.day === 6 && day.close.day === 0)){
            closeTime.setDate(closeTime.getDate() + 1);
          }
          
          if(now.getTime() >= openTime.getTime() &&
             now.getTime() <= closeTime.getTime()) {
            result[key] = breweries[key];
          }
        }
      });
      return result;
    }, {})
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.params.city !== nextProps.params.city) {
      this.setState({
        breweries: Cities[nextProps.params.city]
      });
    }

    if(this.props.location.pathname !== nextProps.location.pathname) {
      ReactGA.pageview(nextProps.location.pathname)
    }

    if(this.props.userCoords !== nextProps.userCoords) {
      this.setState({
        userCoords: nextProps.userCoords
      });
    }
  }

  onLocationChanged(coords) {
    this.setState({userCoords: coords});
  }

  render() {
    const {
      params: {
        city,
        breweryKey
      },
      location: {
        pathname
      }
    } = this.props;

    const currentUrl = `${config.url}${pathname}`;
    const favIcon = `${config.url}/favicon.ico`;
    const activeCityConfig = config.cities[city];
    const activeCityBreweries = Cities[city];
    const activeBreweryName = breweryKey ?
      `${activeCityBreweries[breweryKey].name} - ` : '';
    const title = `${activeBreweryName} ${activeCityConfig.name} Brewery Life`;
    let scripts = [
      {type: "application/ld+json", innerHTML: `{"@context": "http://schema.org","@type": "Organization","url": "${config.url}","logo": "${favIcon}"}`}
    ];
    if(!process.env.REACT_APP_CI) {
      scripts.push({src:"https://connect.facebook.net/en_US/sdk.js"});
    }

    return (
      <div className="App">
        <Helmet
          defaultTitle={title}
          meta={[
            {name: "description", content: activeCityConfig.description},
            {name: "keywords", content: activeCityConfig.keywords},
            {name: "theme-color", content:"#1E90FF"},
            {name: "google-site-verification", content:"tf7IBOxqLPpVM61wOQld8QA5NPGwh-M89iEMhJL2jYU"},
            {property: "fb:app_id", content:"744534482367485"},
            {property: "og:type", content:"website"},
            {property: "og:url", content:currentUrl},
            {property: "og:description", content:activeCityConfig.description},
            {property: "og:title", content: title}
          ]}
          link={[
            {rel:"alternate", hreflang:"en", href:currentUrl},
            {rel:"canonical", itemprop:"url", href:currentUrl},
            {rel:"shortcut icon", href:favIcon},
            {rel:"apple-touch-icon", href:favIcon},
            {rel:"apple-touch-icon", sizes:"160x160", href:favIcon},
          ]}
          script={scripts}
        />
        <Header filterChanged={this.onFilterChanged}
                breweryKey={ breweryKey }
                city={ city }
                allCities={ config.cities }
                breweries={ activeCityBreweries }
        />
        <div className="content">
          {
            breweryKey ?
              <BreweryPage brewery={ activeCityBreweries[breweryKey] }
                           isMobile={ isMobile }
                           userCoordinates={ this.state.userCoords }
                           locationChanged={this.onLocationChanged}
                           activeCity={ city }
                           activeCityBreweries={ activeCityBreweries }
                           isLoggedIn={ this.state.isLoggedIn }
                           fbInit={ this.state.fbInit }
                           currentUrl={ currentUrl }
              />
            :
              <div className="App-map">
                <BreweryMap googleMapsApiKey={ config.googleMapsApiKey }
                            mapCenter={ activeCityConfig.map.center }
                            mapZoom={ activeCityConfig.map.zoom }
                            breweries={ this.state.breweries }
                            activeCity={ city }
                />
              </div>
          }
        </div>
        <Footer 
          allCities={ config.cities }
          router={ this.props.router }
        />
        <div className="hidden-links">
          {
            // include anchor tags to all of our links so
            // search engines can more easily crawl
            Object.keys(config.cities).map((city) => {
              let breweries = config.cities[city].breweries || []
              return [(<a href={`${config.url}/${city}`}>{config.cities[city].name}</a>)].concat(
                Object.keys(breweries).map((brewery) => {
                  return (<a href={`${config.url}/${city}/${brewery}`}>{brewery}</a>)
                })
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
