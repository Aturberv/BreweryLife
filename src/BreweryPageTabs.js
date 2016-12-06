import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import BreweryImages from './BreweryImages';

const BrewTabs = ({ brewery }) => {
	return (
	<Tabs defaultActiveKey={1} id="brew-tabs">
    	<Tab eventKey={1} title="About">
    	    <div className="brewery-description">
    	      <p>{brewery.description}</p>
    	    </div>
    	    <div>
    	        <BreweryImages brewery={brewery} />
    	    </div>
    	</Tab>
    	<Tab eventKey={2} title="Beers">
    		<div className="brewery-beers">
    			Coming soon...
    		</div>
    	</Tab>
    	<Tab eventKey={3} title="Reviews">
    	  <div className="brewery-reviews">
    	    {
    	      brewery.reviews.map((review, idx) =>
    	        <div className="review-text" key={`${brewery.name}${idx}`}>
    	          <p>{ review.rating } / 5</p>
    	          <p>{ review.text }</p>
    	        </div>
    	      )
    	   }
    	  </div>
    	</Tab>
    	<Tab eventKey={4} title="Events">
    		<div className="brewery-events">
    			Coming Soon...
    		</div>
    	</Tab>
    </Tabs>
	)
}

export default BrewTabs;