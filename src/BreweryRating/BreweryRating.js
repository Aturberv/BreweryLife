import React from 'react';
import Icon from 'react-fa'
import StarRating from '../Rating/Rating';
import config from '../../config.json'

const BreweryRating = ({
  ratings
}) => {
    return (
      <div className="brewery-ratings">
        {
          Object.keys(ratings).map((key) => (
              <div key={key}>
                <Icon className="social-icon" name={ config.socialIcons[key] } size='lg' /> 
                <StarRating rating={ ratings[key].rating } />
              </div>
          ))
        }
      </div>
   );
};

export default BreweryRating;