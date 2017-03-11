import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import autoBind from 'react-autobind';
import BreweryMarker from '../BreweryMarker/BreweryMarker';
import Geolocation from '../Geolocation/Geolocation';
import UserMarker from '../UserMarker/UserMarker';
import Crosshairs from '../Crosshairs/Crosshairs';

class BreweryMap extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      pulsing: null,
      showComponent: false,
    }
  }

  componentWillMount() {
    var interval = setInterval(this.randomBrewery, 7000);
    this.setState({
      interval: interval
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  randomBrewery() {
    this.setState({
      pulsing: Math.floor(Math.random() * Object.keys(this.props.breweries).length)
    });
  }

  onClickRender() {
    if(this.state.showComponent !== true) {
      this.setState({
        showComponent: true
      })
    }
  }

  render() {
    const {
      googleMapsApiKey,
      mapCenter,
      mapZoom,
      breweries,
      activeCity,
      userCoordinates,
      interactive = true,
    } = this.props;
    return (
      <GoogleMap
        bootstrapURLKeys={{ key: googleMapsApiKey, language: 'en' }}
        center={ 
                  userCoordinates ? 
                    {lat: userCoordinates.latitude, lng: userCoordinates.longitude} 
                  : 
                    mapCenter 
                }
        zoom={ userCoordinates ? mapZoom - 1 : mapZoom }
        options={!interactive && 
                  {
                    disableDefaultUI:true,
                    draggable: false,
                    zoomControl: false,
                    scrollwheel: false,
                    disableDoubleClickZoom: true
                  }
                }
        defaultZoom={ 12 }
      >
      <Crosshairs clickRender={this.onClickRender} />
        {
          this.state.showComponent &&
          <Geolocation locationChanged={this.props.locationChanged} />
        }
          {
            userCoordinates &&
            <UserMarker lat={userCoordinates.latitude} 
                        lng={userCoordinates.longitude} />
          }
        {
          Object.keys(breweries).map((breweryKey, idx) =>
              <BreweryMarker
                 key={ breweryKey }
                 lat={ breweries[breweryKey].location.lat }
                 lng={ breweries[breweryKey].location.lng }
                 pageUrl={ `/${activeCity}/${breweryKey}` }
                 breweryKey={ breweryKey }
                 brewery={ breweries[breweryKey] }
                 pulsing={ interactive && idx === this.state.pulsing }
              />
          )
        }
      </GoogleMap>
    );
  }
}


export default BreweryMap;