import React from 'react';
import Icon from 'react-fa'
import StarRating from '../Rating/Rating';
import './BreweryRating.css'

const BreweryRating = ({
  ratings
}) => {
  const socialIcons = {
    "facebook": "facebook",
    "twitter": "twitter",
    "instagram": "instagram",
    "website": "globe",
    "untappd": "beer",
    "yelp": "yelp",
    "google": "google"
  }
    return (
      <div className="brewery-ratings">
        {
          Object.keys(ratings).map((key) => (
              <div key={key}>
                <Icon className="social-icon" name={ socialIcons[key] } size='lg' /> 
                <StarRating rating={ ratings[key].rating } />
              </div>
          ))
        }
      </div>
   );
};

export default BreweryRating;