import React, { PropTypes } from 'react';
import './BreweryDescription.css';

const BreweryDescription = ({description}) => {
	return (
  	    <div className="brewery-description">
    	    <p>{description}</p>
    	</div>
	)
}

BreweryDescription.propTypes = {
    description: PropTypes.string.isRequired
};


export default BreweryDescription;