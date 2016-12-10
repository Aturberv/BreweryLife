import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import './BreweryMarker.css';

const BreweryMarker = ({
  brewery,
  breweryKey
}) => {
  const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={brewery.name}>
        <div>
          <div>{`Yelp: ${brewery.yelpRating}/5 (${brewery.yelpNumReviews} reviews)`}</div>
          <div>{`Google: ${brewery.googleRating}/5`}</div>
        </div>
      </Popover>
    );

    return (
      <Link to={`/${breweryKey}`}>
        <div className="brewery-pin">
          <OverlayTrigger trigger={['hover', 'focus']} 
                          placement="top" 
                          overlay={popoverHoverFocus}>
           <img src={require('./images/beer_pin-3.png')} 
                role="presentation" />
          </OverlayTrigger>
        </div>
      </Link>
   );
};

export default BreweryMarker;