import React from 'react';

const BreweryDescription = ({brewery}) => {
	return (
  	    <div className="brewery-description">
    	      <p>{brewery.breweryDescription}</p>
    	</div>
	)
}


export default BreweryDescription;