import React, { Component } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import './BrewModal.css';
import ReactGA from 'react-ga';
import BreweryPage from './BreweryPage';
import autoBind from 'react-autobind';

class BreweryMarker extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isShowing: false,
    }
  }

  toggle() {
    !this.state.isShowing ?
        ReactGA.modalview(this.props.brewery.name)
      : ReactGA.pageview('/') && ReactGA.event({
          category: 'Modal',
          action: 'Closed',
          label: this.props.brewery.name});
    this.setState({ isShowing: !this.state.isShowing });
  }

  render() {
    const {
      brewery
    } = this.props;

    const popoverHoverFocus = (
      <Popover id="popover-trigger-hover-focus" title={this.props.brewery.name}>
        <div>
          <div>{`Yelp: ${brewery.yelpRating}/5 (${brewery.yelpNumReviews} reviews)`}</div>
          <div>{`Google: ${brewery.googleRating}/5`}</div>
        </div>
      </Popover>
    );

    return (
      <div className="brewery-pin">
        <OverlayTrigger trigger={['hover', 'focus']} 
                        placement="top" 
                        overlay={popoverHoverFocus}>
      	<div onClick={this.toggle} >
      	 <img src={require('./images/beer_pin-3.png')} 
              role="presentation" />
        </div>
        </OverlayTrigger>
        <div className="brewery-page">
        <BreweryPage isShowing={this.state.isShowing}
                     toggle={this.toggle}
                     brewery={brewery}
        />
        </div>
      </div>
   );
  }
};

export default BreweryMarker;