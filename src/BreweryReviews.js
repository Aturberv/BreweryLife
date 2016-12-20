import React from 'react';
import './BreweryReviews.css';

var Rating = require('react-rating');

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
       	        <Rating 
                            initialRate={ review.rating } 
                            readonly={true} fractions={2} 
                            empty={<span className="fa fa-star-o fa-lg" />} 
                            full={<span className="fa fa-star fa-lg" />} />
       	        <p className="brew-review-text">{ review.text }</p>
       	      </div>
       	    )
       	  }
              </div>
       </div>
	)
}

export default BreweryReviews;