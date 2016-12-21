import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import StarRating from '../Rating';
import './BreweryMarker.css';

const BreweryMarker = ({
  brewery,
  breweryKey
}) => {
  const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={brewery.name}>
        <div>
          <div>
          <p>Yelp:
            <StarRating rating={ brewery.yelpRating } />
          {`, ${brewery.yelpNumReviews} reviews`}</p>
          </div>
          <div>
          Google:
            <StarRating rating={ brewery.googleRating } />
          </div>
        </div>
      </Popover>
    );

    return (
      <Link to={`/${breweryKey}`}>
        <div className="brewery-pin">
          <OverlayTrigger trigger={['hover', 'focus']} 
                          placement="top" 
                          overlay={popoverHoverFocus}>
           <img src={require('../images/beer_pin-3.png')} 
                role="presentation" />
          </OverlayTrigger>
        </div>
      </Link>
   );
};

export default BreweryMarker;