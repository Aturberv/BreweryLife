import React, { Component } from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import BreweryDescription from './BreweryDescription'

class BreweryMarker extends Component {
	state = {
		isShowingModal: false,
	}
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    return (
      <div onClick={this.handleClick}>
      <div style={{width:'25px', height:'25px', background:'red'}}/>
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

export default BreweryMarker;
