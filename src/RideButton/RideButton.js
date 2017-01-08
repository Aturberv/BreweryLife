import React, { Component } from 'react';
import ReactGA from 'react-ga';
import autoBind from 'react-autobind';
import './RideButton.css';



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
        if(this.props.isMobile && this.props.userCoordinates) {
            console.log('refreshing');
            console.log(this.props.userCoordinates)
            bttnio('refresh') //eslint-disable-line no-undef    
        }
    }

    locationString() {
        return `{
            "user_location": {
                "latitude": ${this.props.userCoordinates.latitude},
                "longitude": ${this.props.userCoordinates.longitude}
            },
            "subject_location": {
                "latitude": ${this.props.destination.lat},
                "longitude": ${this.props.destination.lng}
            }
        }`
    }

   loadingDisplay() {
        const text = this.props.isMobile ? "Getting location..." 
                                         : "Unavailable on desktop";
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
        ReactGA.event({
            category: 'Ride Request',
            action: 'Click',
            label: this.props.breweryName
        });
    }


    render() {
        const { isMobile, userCoordinates } = this.props; 
        return (
            <div className="ride-button">
                <div>
                {
                    !userCoordinates ?
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

export default RideButton;




