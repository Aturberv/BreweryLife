import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BreweryPageMeta from '../BreweryPageMeta/BreweryPageMeta';
import BreweryImages from '../BreweryImages/BreweryImages';
import BreweryReviews from '../BreweryReviews/BreweryReviews';
import BreweryDescription from '../BreweryDescription/BreweryDescription';
import BreweryBeers from '../BreweryBeers/BreweryBeers';
import BrewerySocial from '../BrewerySocial/BrewerySocial';
import BreweryRating from '../BreweryRating/BreweryRating';
import BreweryMap from '../BreweryMap/BreweryMap';
import RideButton from '../RideButton/RideButton';
import BreweryInfo from '../BreweryInfo/BreweryInfo';
import Facebook from '../Facebook/Facebook';

import config from '../../config.json';

import './BreweryPage.css';

const BreweryPage = (
{
    brewery, 
    userCoordinates,
    locationChanged,
    isMobile,
    activeCity,
    activeCityBreweries,
    isLoggedIn,
    currentUrl,
    fbInit
}) => {
    return (
      <div className="breweryPage" itemScope itemType="http://schema.org/Brewery">
            <BreweryPageMeta brewery={brewery} currentUrl={currentUrl}/>
            <div className="breweryPage-header">
                <center>
                    <h1 className="brewery-name">{brewery.name}</h1>
                    {brewery.breweryDescription && <BreweryDescription description={brewery.breweryDescription} />}
                    <BrewerySocial social={brewery.social} />
                    {
                        brewery.location.valid ?
                            <RideButton userCoordinates={userCoordinates}
                                    isMobile={isMobile}
                                    destination={brewery.location}
                                    locationChanged={locationChanged}
                                    />
                        :
                            <div>
                                This brewery is not open for visiting.
                            </div>
                    }
                    <Facebook isLoggedIn={isLoggedIn} 
                              currentUrl={currentUrl}
                              fbInit={fbInit} 
                    />
                </center>
                <div className="container">
                <Row className="brewery-stuff">
                    <Col sm={12} md={6}>
                        <center>
                            <Col sm={12} md={6}>
                                <BreweryRating ratings={brewery.breweryRating} />
                            </Col>
                            <Col sm={12} md={6}>
                                <BreweryInfo info={brewery.brewInfo} />
                            </Col>
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
                                        interactive={ false }
                            />
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
            <div>
                {brewery.photos.length > 0 && <BreweryImages photos={brewery.photos} />}
                {brewery.reviews.length > 0 && <BreweryReviews reviews={brewery.reviews} />}
                {brewery.beers.length > 0 && <BreweryBeers beers={brewery.beers} />}
            </div>
        </div>
    );
}

export default BreweryPage;


