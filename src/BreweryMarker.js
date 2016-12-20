import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router';
import './BreweryMarker.css';

var Rating = require('react-rating');

const BreweryMarker = ({
  brewery,
  breweryKey
}) => {
  const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={brewery.name}>
        <div>
          <div>
          <p>Yelp:
            <Rating 
              initialRate={ brewery.yelpRating } 
              readonly={true} 
              fractions={2} 
              empty={<span className="fa fa-star-o fa-lg" />} 
              full={<span className="fa fa-star fa-lg" />} />
          {`, ${brewery.yelpNumReviews} reviews`}</p>
          </div>
          <div>
          Google:
            <Rating 
              initialRate={ brewery.googleRating } 
              readonly={true} 
              fractions={2} 
              empty={<span className="fa fa-star-o fa-lg" />} 
              full={<span className="fa fa-star fa-lg" />} />
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
           <img src={require('./images/beer_pin-3.png')} 
                role="presentation" />
          </OverlayTrigger>
        </div>
      </Link>
   );
};

export default BreweryMarker;