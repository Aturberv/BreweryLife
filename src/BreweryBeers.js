import React from 'react';

const BreweryBeers = ({brewery}) => {
	return (
		<div>
		{
			brewery.beers.map((beer, idx) =>
				<div key={beer.beerName} className="brewery-beers">
    				<img className="beer-label" src={beer.beerLabel} role="presentation" />
                    <div className="beer-info">
    					<h3>{beer.beerName}</h3>
    					<h4>{beer.beerStyle}</h4>
    					<p>{beer.beerDescription}</p>
                    <div className="beer-stats">
    					ABV and IBU go here.
    					<p>rating: {beer.beerRating} reviews: {beer.beerRatingCount}</p>
                    </div> 
    				</div>
    			</div>
    		)
    	}
    	</div>
	);
}

export default BreweryBeers;