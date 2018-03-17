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
                                <div itemScope itemType="http://schema.org/Product">
                                    <img itemProp="image" className="beer-label" src={beer.beerLabel} role="presentation" />
                                    <div className="beer-info">
                                        <h3 itemProp="name">{beer.beerName}</h3>
                                        <h4>{beer.beerStyle}</h4>
                                        <p itemProp="description">{beer.beerDescription}</p>
                                        <div className="beer-stats">
                                            <p>ABV: {beer.beerABV}, IBU: {beer.beerIBU}</p>
                                            {
                                                beer.beerRating ?
                                                <span itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                                                    <meta itemProp="ratingValue" content={beer.beerRating}/>
                                                    <meta itemProp="ratingCount" content={beer.beerRatingCount}/>
                                                    <StarRating rating={beer.beerRating} />
                                                    <p>reviews: {beer.beerRatingCount}</p>
                                                </span>
                                                :
                                                <span>
                                                    <StarRating rating={beer.beerRating} />
                                                    <p>reviews: {beer.beerRatingCount}</p>
                                                </span>
                                            }
                                        </div> 
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