import React from 'react';
import './BreweryDescription.css';

const BreweryDescription = ({description}) => {
	return (
  	    <div className="brewery-description">
    	    <p>{description}</p>
    	</div>
	)
}

export default BreweryDescription;