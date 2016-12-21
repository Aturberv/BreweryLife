import React from 'react';
import StarRating from '../Rating';
import './BreweryReviews.css';

const BreweryReviews = ({ brewery }) => {
	return(
       <div className="brew-reviews-container">
          <div className="brew-reviews-header">
            <h3>Reviews</h3>
          </div>
          <div className="brewery-reviews">
       	    {
       	    brewery.reviews.map((review, idx) =>
       	      <div className="review-text" key={`${brewery.name}${idx}`}>
       	        <StarRating rating={ review.rating } />
       	        <p className="brew-review-text">{ review.text }</p>
       	      </div>
       	      )
       	    }
          </div>
       </div>
	)
}

export default BreweryReviews;