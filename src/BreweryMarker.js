import React, { Component } from 'react';
import { Modal, Button, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import './BrewModal.css';

class BreweryMarker extends Component {
	state = {
		isShowingModal: false,
	}

  render() {
    const {
      brewery
    } = this.props;
  	let close = () => this.setState({ isShowingModal: false });

 	const popoverHoverFocus = (
		<Popover id="popover-trigger-hover-focus" title={brewery.name}>
			<ul>
				<li><a href={`https://yelp.com/biz/${brewery.yelpBusinessId}`}>Yelp: </a>{brewery.yelpRating} stars ({brewery.yelpNumReviews} reviews)</li>
				<li><a href={brewery.googleUrl}>Google: </a>{brewery.googleRating}</li>
			</ul>
		</Popover>
	);

    return (
      <div className="modal-container" style={{height: 200}}>
      <ButtonToolbar>
        <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={popoverHoverFocus}>
      	<div onClick={() => this.setState({ isShowingModal: true })} >
      		<img 
      			src={require('../public/beer_pin-3.png')} 
      			role="presentation" 
      		/>
      	</div>
      	</OverlayTrigger>
      </ButtonToolbar>

        <Modal
        	show={this.state.isShowingModal}
        	onHide={close}
        	aria-labelledby="contained-modal-title"
        >
        	<Modal.Header closeButton>
        		<Modal.Title id="contained-modal-title">{brewery.name}</Modal.Title>
        	</Modal.Header>
        	<Modal.Body>
        		<div>
              {brewery.description}
            </div>
            <div>
              {
                brewery.reviews.map((review, idx) =>
                  <div key={`${brewery.name}${idx}`}>
                    <p>{ review.rating } / 5</p>
                    <p>{ review.text }</p>
                  </div>
                )
              }
            </div>
        	</Modal.Body>
        	<Modal.Footer>
        		<Button onClick={close}>Close</Button>
        	</Modal.Footer>
        </Modal>
    </div>
   );
  }
};

export default BreweryMarker;