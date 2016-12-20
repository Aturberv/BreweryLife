import React from 'react';
import './BreweryMenu.css';

// future reference for layout for displaying a beer menu (whats currently on tap) at
// each brewery, could possibly include rating from untappd.

var Rating = require('react-rating');

const BreweryMenu = ({ brewery }) => {
	return(
		<div className="brewery-menu-container">
            <div className="brew-reviews-header">
                <h3>Beer Reviews</h3>
            </div>
            <div className="brewery-reviews">
       	  	{
       	    brewery.reviews.map((review, idx) =>
       	      	<div className="review-text" key={`${brewery.name}${idx}`}>
       	        	<Rating 
                        initialRate={ review.rating } 
                        readonly={true} fractions={1/2} 
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

export default BreweryMenu;