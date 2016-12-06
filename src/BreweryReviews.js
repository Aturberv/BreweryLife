import React from 'react';

const BreweryReviews = ({ brewery }) => {
	return(
       	<div className="brewery-reviews">
       	  {
       	    brewery.reviews.map((review, idx) =>
       	      <div className="review-text" key={`${brewery.name}${idx}`}>
       	        <p>{ review.rating } / 5</p>
       	        <p>{ review.text }</p>
       	      </div>
       	    )
       	  }
       	</div>
	)
}

export default BreweryReviews;