import React from 'react';

const BreweryBeers = ({brewery}) => {
	return (
		<div>
		{
			brewery.beers.map((beer, idx) =>
				<div key={beer, idx} className="brewery-beers">
				<span>
    				<img src={beer.beerLabel} role="presentation" />
    				<h3>{beer.beerName}</h3>
    			</span>
    				<h4>{beer.beerStyle}</h4>
    				<p>{beer.beerDescription}</p>
    				<p>rating: {beer.beerRating} reviews: {beer.beerRatingCount}</p>
    			</div>
    		)
    	}
    	</div>
	);
}

export default BreweryBeers;