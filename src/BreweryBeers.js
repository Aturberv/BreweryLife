import React from 'react';
import './BreweryBeers.css';

var Rating = require('react-rating');

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
    					<p>ABV: {beer.beerABV}, IBU: {beer.beerIBU}</p>
                        <Rating 
                            initialRate={ beer.beerRating } 
                            readonly={true} 
                            fractions={2} 
                            empty={<span className="fa fa-star-o fa-lg" />} 
                            full={<span className="fa fa-star fa-lg" />} />
                        <p>reviews: {beer.beerRatingCount}</p>
                    </div> 
    				</div>
    			</div>
    		)
    	}
    	</div>
	);
}

export default BreweryBeers;