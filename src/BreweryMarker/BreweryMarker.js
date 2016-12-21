import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import StarRating from '../Rating/Rating';
import './BreweryMarker.css';

const BreweryMarker = ({
  brewery,
  breweryKey
}) => {
  const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={brewery.name}>
      { brewery.yelpRating ? (
        <div>
          <div>
            <p>
              Yelp:
              <StarRating rating={ brewery.yelpRating } />
              {`, ${brewery.yelpNumReviews} reviews`}
            </p>
          </div>
          <div>
            Google:
            <StarRating rating={ brewery.googleRating } />
          </div>
        </div>
        ) : (
          <div>
            Google:
            <StarRating rating={ brewery.googleRating } />
          </div>        
      )}
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