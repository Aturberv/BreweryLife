import React from 'react';
import Icon from 'react-fa'
import StarRating from '../Rating/Rating';

const BreweryRating = ({
  brewery
}) => {
    // TODO: this is a hack until our data model has a ratings object
    const ratingMap = {
      'yelp': {
        'rating': 'yelpRating',
        'num': 'yelpNumReviews'
      },
      'google': {
        'rating': 'googleRating',
        'num': null
      }
    }
    return (
      <div>
        {
          Object.keys(ratingMap).map((key) => (
            brewery[ratingMap[key].rating] &&
              <div key={key}>
                <Icon className="social-icon" name={ key } size='2x' />
                <StarRating rating={ brewery[ratingMap[key].rating] } />
              </div>
          ))
        }
      </div>
   );
};

export default BreweryRating;