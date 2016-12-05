import React, { Component } from 'react';
import { Modal, Button, Popover, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import './BrewModal.css';

class BreweryMarker extends Component {
	state = {
		isShowingModal: false,
	}

  render() {
  	let close = () => this.setState({ isShowingModal: false });

 	const popoverHoverFocus = (
		<Popover id="popover-trigger-hover-focus" title={this.props.brewery.name}>
			<ul>
				<li>{this.props.brewery.rating} stars</li>
				<li>{this.props.brewery.reviews} reviews</li>
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
        		<Modal.Title id="contained-modal-title">{this.props.brewery.name}</Modal.Title>
        	</Modal.Header>
        	<Modal.Body>
        		{this.props.brewery.description}
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