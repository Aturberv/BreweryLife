import React from 'react';
import Rating from 'react-rating';
import './Rating.css';

const StarRating = ({ rating }) => {
	return (
		<Rating 
			initialRate={rating}
			readonly={true}
			fractions={4}
            empty={<span className="fa fa-star-o fa-lg" />} 
            full={<span className="fa fa-star fa-lg" />}
		/>
	)
}

export default StarRating;