import React, { Component } from 'react';

class BreweryDescription extends Component {

	render() {
		const {
	  		brewery
	  	} = this.props;
	  	return (
	  		<div>
	        <h1>{brewery.name}</h1>
	        <p>{brewery.description}</p>
	        </div>
	    );
	}
}

export default BreweryDescription;