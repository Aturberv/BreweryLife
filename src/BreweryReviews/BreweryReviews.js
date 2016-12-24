import React from 'react';
import StarRating from '../Rating/Rating';
import './BreweryReviews.css';

const BreweryReviews = ({ reviews }) => {
	return(
       <div className="brew-reviews-container">
          <div className="brew-reviews-header">
            <center><h3>Reviews</h3></center>
          </div>
          <div className="brewery-reviews">
       	    {
       	    reviews.map((review, idx) =>
       	      <div className="review-text" key={`${idx}`}>
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