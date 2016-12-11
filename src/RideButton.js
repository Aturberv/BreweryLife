import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';
import ReactGA from 'react-ga';
import autoBind from 'react-autobind';
import './RideButton.css';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

class RideButton extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    componentDidUpdate() {
        this.refreshButton();
    }

    componentDidMount() {
        this.refreshButton();
    }

    refreshButton(){
        if(isMobile && this.props.coords) {
            bttnio('refresh') //eslint-disable-line no-undef    
        }
    }

    locationString() {
        if(!this.props.coords) return "";
        return `{
            "user_location": {
                "latitude": ${this.props.coords.latitude},
                "longitude": ${this.props.coords.longitude}
            },
            "subject_location": {
                "latitude": ${this.props.destination.lat},
                "longitude": ${this.props.destination.lng}
            }
        }`
    }

   loadingDisplay() {
        console.log('display')
        const text = isMobile ? "Getting location" : "Unavailable on desktop";
        return (
            <div className="uber-placeholder">
                <img role="presentation"
                     className="uber-logo" 
                     src="https://cdn.usebutton.com/dlc/service/uber/uber_v3_icon_100px.png"/>
                <span>{text}</span>
            </div>
        )
    }

    onRideRequest() {
        console.log('clicked button')
        ReactGA.event({
            category: 'Ride Request',
            action: 'Click',
            label: this.props.breweryName
        });
    }


    render() {
        const { coords } = this.props;
        return (
            <div className="ride-button">
                <div>
                {
                    !coords ?
                        this.loadingDisplay()
                    :
                        isMobile && <div data-bttnio-id="btn-58c5e756c2a3e133"
                                         data-bttnio-context={this.locationString()}
                                         onClick={this.onRideRequest}>
                        </div>
                }
                </div>
            </div>
        );
    }
}

if(isMobile) {
    RideButton = geolocated({
        positionOptions: {
            enableHighAccuracy: false
        },
        userDecisionTimeout: 5000
    })(RideButton);  
}

export default RideButton;




