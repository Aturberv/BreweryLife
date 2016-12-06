import React from 'react';

const BreweryDescription = ({brewery}) => {
	return (
  	    <div className="brewery-description">
    	      <p>{brewery.description}</p>
    	</div>
	)
}


export default BreweryDescription;