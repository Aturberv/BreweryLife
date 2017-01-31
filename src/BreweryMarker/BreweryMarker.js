import React from 'react';
import { Link } from 'react-router';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import BreweryRating from '../BreweryRating/BreweryRating';

import './BreweryMarker.css';

const BreweryMarker = ({
  brewery,
  breweryKey,
  pageUrl,
  pulsing
}) => {
  // TODO: show aggregate rating and open info
  const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={brewery.name}>
        <BreweryRating ratings={brewery.breweryRating} />
      </Popover>
    );

    return (
      <Link to={ pageUrl }>
        <div className="brewery-pin">
          <OverlayTrigger trigger={['hover', 'focus']} 
                          placement="top" 
                          overlay={popoverHoverFocus}>
            <div>
              { pulsing && <div className="brewery-logo-ring"></div> }
              <img
                className="brewery-logo" 
                src={brewery.breweryLogo ? brewery.breweryLogo : require('../images/beer_pin-3.png')} 
                role="presentation" />
            </div>
          </OverlayTrigger>
        </div>
      </Link>
   );
};

export default BreweryMarker;