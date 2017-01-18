import React from 'react';
import Helmet from 'react-helmet';
import { Row, Col } from 'react-bootstrap';

import BreweryImages from '../BreweryImages/BreweryImages';
import BreweryReviews from '../BreweryReviews/BreweryReviews';
import BreweryDescription from '../BreweryDescription/BreweryDescription';
import BreweryBeers from '../BreweryBeers/BreweryBeers';
import BrewerySocial from '../BrewerySocial/BrewerySocial';
import BreweryRating from '../BreweryRating/BreweryRating';
import BreweryMap from '../BreweryMap/BreweryMap';
import RideButton from '../RideButton/RideButton';

import config from '../../config.json';

import './BreweryPage.css';

const BreweryPage = (
{
    brewery, 
    userCoordinates,
    isMobile,
    activeCity,
    activeCityBreweries,
    isLoggedIn,
    currentUrl
}) => {
    return (
      <div className="breweryPage" itemScope itemType="http://schema.org/Brewery">
          <meta itemProp="priceRange" content="$" />
          <meta itemProp="servesCuisine" content="beer" />
          { /* TODO: address, telephone number, hours */ }
          <meta itemProp="name" content={brewery.name} />
          <meta itemProp="hasMap" content={currentUrl} />
          <meta itemProp="url" content={currentUrl} />
          <meta itemProp="logo" content={brewery.breweryLogo} />
          <meta itemProp="description" content={brewery.breweryDescription} />
          <meta itemProp="image" content={brewery.breweryLogo} />
          <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
              <meta itemProp="latitude" content={brewery.location.lat} />
              <meta itemProp="longitude" content={brewery.location.lng} />
          </div>
          <div itemProp="geo" itemScope itemType="http://schema.org/GeoCircle">
              <div itemProp="geoMidpoint" itemScope itemType="http://schema.org/GeoCoordinates">
                  <meta itemProp="latitude" content={brewery.location.lat} />
                  <meta itemProp="longitude" content={brewery.location.lng} />
              </div>
              <meta itemProp="geoRadius" content="50" />
          </div>
          <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content={brewery.breweryRating.yelp.rating}/>
            <meta itemProp="ratingCount" content={brewery.breweryRating.yelp.reviewCount}/>
          </div>
          <Helmet 
              title={ brewery.name }
              meta={[
                {name:"description", content:brewery.breweryDescription},
                {property: "og:type", content:"restaurant.restaurant"},
                {property: "og:url", content:currentUrl},
                {property: "og:image", content:brewery.breweryLogo},
                {property: "og:description", content:brewery.breweryDescription},
                {property: "place:location:latitude", content:brewery.location.lat},
                {property: "place:location:longitude", content:brewery.location.lng},
                {property: "restaurant:price_rating", content:1},
                {property: "restaurant:cateogry", content:"brewery"},
                {property: "restaurant:cateogry", content:"beer"},
              ]}
            />

            <div className="breweryPage-header">
                <center>
                    <h1 className="brewery-name">{brewery.name}</h1>
                    <BrewerySocial social={brewery.social} />
                    <RideButton breweryName={brewery.name} 
                                userCoordinates={userCoordinates}
                                isMobile={isMobile}
                                destination={brewery.location}/>
                </center>
                <div className="container">
                <Row className="brewery-stuff">
                    <Col sm={12} md={6}>
                        <center>
                            <BreweryRating ratings={brewery.breweryRating} />
                        </center>
                    </Col>
                    <Col sm={12} md={6}>
                        <div className="breweryPage-map">
                            <BreweryMap googleMapsApiKey={ config.googleMapsApiKey }
                                        mapCenter={ {
                                            lat: brewery.location.lat,
                                            lng: brewery.location.lng
                                        } }
                                        mapZoom={ 15 }
                                        breweries={ activeCityBreweries }
                                        activeCity={ activeCity }
                            />
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
            <div>
                <BreweryDescription description={brewery.breweryDescription} />
                <BreweryImages photos={brewery.photos} />
                <BreweryReviews reviews={brewery.reviews} />
                <BreweryBeers beers={brewery.beers} />
            </div>
        </div>
    );
}

export default BreweryPage;


