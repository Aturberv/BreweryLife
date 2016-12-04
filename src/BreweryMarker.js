import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import BreweryDescription from './BreweryDescription'

class breweryMarker extends Component {
	state = {
		isShowingModal: false,
	}
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    return (
      <div onClick={this.handleClick}>
      	<div><img src={require('../public/beer_pin-3.png')} role="presentation" /></div>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog style={{width:'80%'}} onClose={this.handleClose}>
          	<BreweryDescription brewery={this.props.brewery} />
          </ModalDialog>
        </ModalContainer>
      }
    </div>
   );
  }
}

export default breweryMarker;
