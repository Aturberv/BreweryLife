import React from 'react';
import './BreweryDescription.css';

const BreweryDescription = ({brewery}) => {
	return (
  	    <div className="brewery-description">
    	      <p>{brewery.breweryDescription}</p>
    	</div>
	)
}


export default BreweryDescription;