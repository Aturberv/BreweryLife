import React from 'react';
import GoogleMap from 'google-map-react';
import BreweryMarker from '../BreweryMarker/BreweryMarker';

const BreweryMap = ({
  googleMapsApiKey,
  mapCenter,
  mapZoom,
  breweries,
  activeCity
}) => {

  return (
    <GoogleMap
      bootstrapURLKeys={{ key: googleMapsApiKey, language: 'en' }}
      center={ mapCenter }
      zoom={ mapZoom }
      defaultZoom={ 12 }
    >
      {
        Object.keys(breweries).map((breweryKey) =>
            <BreweryMarker
               key={ breweryKey }
               lat={ breweries[breweryKey].location.lat }
               lng={ breweries[breweryKey].location.lng }
               pageUrl={ `${activeCity}/${breweryKey}` }
               breweryKey={ breweryKey }
               brewery={ breweries[breweryKey] }
            />
        )
      }
    </GoogleMap>
  );
}

export default BreweryMap;