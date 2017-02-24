import React, {Component} from 'react';
import {geolocated} from 'react-geolocated';
import autoBind from 'react-autobind';
import './Geolocation.css';

class Geolocation extends Component {
	constructor(props) {
		super(props)
		autoBind(this)
		this.state = {
			userCoords: {},
			showComponent: false
		}
	}

	componentWillMount() {
		this.updateLocation(this.props.coords)
	}

	componentDidMount() {
		this.updateLocation(this.props.coords)
	}

	updateLocation(coords) {
		this.setState({
			userCoords: coords
		}, () => this.props.locationChanged(this.props.coords))
	}

	onClickRender() {
    	this.setState({showComponent: true});
    	this.updateLocation(this.props.coords)
  	}

	render() {
		return (
			<div onClick={this.onClickRender}>
			{this.props.children}
			{
				this.state.showComponent ?
					<div className="user-location" />
				:
					null
			}
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