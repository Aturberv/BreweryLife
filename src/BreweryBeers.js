import React from 'react';

const BreweryBeers = ({brewery}) => {
	return (
		{
			brewery.beers.map((beer) =>
				<div className="brewery-beers">
    				<img src={beer.beerLabel} />
    				<h3>beer.beerName</h3>
    				<h4>beer.beerStyle</h4>
    				<p>beer.beerDescription</p>
    				<span>rating: beer.beerRating, reviews: beer.beerRatingCount</span>
    			</div>
    	}
	)
}

export default BreweryBeers;