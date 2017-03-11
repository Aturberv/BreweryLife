import React, { Component } from 'react';
import ReactGA from 'react-ga';
import autoBind from 'react-autobind';
import Geolocation from '../Geolocation/Geolocation'
import './RideButton.css';

class RideButton extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.state = { showComponent: false }
    }

    componentDidUpdate() {
        this.refreshButton();
    }

    componentDidMount() {
        this.refreshButton();
    }

    refreshButton(){
        if(this.props.isMobile && this.props.userCoordinates) {
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
        const text = this.props.isMobile ? this.props.userCoordinates ?
                                             "Finding an uber..."
                                           : "Request an uber..."
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

    onClickRender() {
        if(this.state.showComponent !== true){
            this.setState({showComponent: true});
        }
    }

    render() {
        const { isMobile, userCoordinates } = this.props;
        return (
            <div>
                <div onClick={this.onClickRender}>
                {
                    this.state.showComponent && isMobile ?
                    <Geolocation locationChanged={this.props.locationChanged}>
                        {
                        !userCoordinates ?
                            this.loadingDisplay()
                        :
                            <div className="ride-button"
                                 data-bttnio-id="btn-58c5e756c2a3e133"
                                 data-bttnio-context={this.locationString()}
                                 onClick={this.onRideRequest}>
                                { this.loadingDisplay() }
                            </div>
                        }
                    </Geolocation> 
                    :
                        this.loadingDisplay()
                }
                </div>
            </div>
        );
    }
}

export default RideButton;