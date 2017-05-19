import React, {Component} from 'react';
import {geolocated} from 'react-geolocated';
import autoBind from 'react-autobind';
import './Geolocation.css';

class Geolocation extends Component {
	constructor(props) {
		super(props)
		autoBind(this)
		this.state = {
			userCoords: {}
		}
	}

	componentWillMount(){
		if(this.compareCoordinates(this.state.userCoords, this.props.coords)){
			this.updateLocation(this.props.coords)
		}
	}

	componentWillReceiveProps(nextProps){
		if(this.props.coords !== nextProps.coords) {
			this.updateLocation(nextProps.coords)
		}
	}

	updateLocation(coords) {
		if(this.compareCoordinates(this.state.userCoords, coords)) {
			this.setState({
				userCoords: coords
			}, () => this.props.locationChanged(coords))
		}
	}

	compareCoordinates(userCoords, coords){
		if(userCoords && coords){
			if(userCoords.latitude !== coords.latitude || 
		   	   userCoords.longitude !== coords.longitude){
				return true
			} else {
				return false
			}
		}
	}

	render() {
		return (
			<div onClick={this.updateLocation(this.props.coords)}>
				{this.props.children}
			</div>
		)
	}
}

// can we figure out what city to default to
// based on their location?
Geolocation = geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(Geolocation);

export default Geolocation;