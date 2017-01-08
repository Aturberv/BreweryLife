import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StarRating from '../Rating/Rating';
import './BreweryReviews.css';

const BreweryReviews = ({ reviews }) => {
    const everyTwoReviews = [];
    for (var i = 0; i < reviews.length; i+=2){
        everyTwoReviews.push(reviews.slice(i, i+2));
    }

	return(
       <div className="brew-reviews-container">
          <div className="brew-reviews-header">
            <center><h1>Reviews</h1></center>
          </div>
          <div className="brewery-reviews">
          {
            everyTwoReviews.map((twoReviews,idx) =>
              <Row key={idx}>
              {
                twoReviews.map((review, idx) =>
                  <Col xs={12} md={6} key={idx} className="brew-review">
                    <StarRating rating={ review.rating } />
                    <p className="brew-review-text">{ review.text }</p>
                  </Col>
                )
              }
              </Row>
            )
          }
          </div>
       </div>
	)
}

export default BreweryReviews;