import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StarRating from '../Rating/Rating';
import './BreweryBeers.css';


const BreweryBeers = ({beers}) => {
    const everyTwoBeers = [];
    for (var i = 0; i < beers.length; i+=2){
        everyTwoBeers.push(beers.slice(i, i+2));
    }

	return (
		<div>
            <div className="brewery-beers-title">
                <center><h1>Beers</h1></center>
            </div>
            {
                everyTwoBeers.map((twoBeers, idx) =>
                    <Row key={idx}>
                    {
                        twoBeers.map((beer) =>
                            <Col sm={12} md={6} key={beer.beerName} className="brewery-beers">
                                <img className="beer-label" src={beer.beerLabel} role="presentation" />
                                <div className="beer-info">
                                    <h3>{beer.beerName}</h3>
                                    <h4>{beer.beerStyle}</h4>
                                    <p>{beer.beerDescription}</p>
                                    <div className="beer-stats">
                                        <p>ABV: {beer.beerABV}, IBU: {beer.beerIBU}</p>
                                        <StarRating rating={beer.beerRating} />
                                        <p>reviews: {beer.beerRatingCount}</p>
                                    </div> 
                                </div>
                            </Col>
                        )
                    }
                    </Row>
                )
            }
		
    	</div>
	);
}

export default BreweryBeers;