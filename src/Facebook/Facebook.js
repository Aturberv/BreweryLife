/* global FB */

import React, { Component } from 'react';
import autoBind from 'react-autobind';

import './Facebook.css';

class App extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount(){
    if(this.props.fbInit){
      FB.XFBML.parse(document.getElementById('facebook-container'));  
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.fbInit && (this.props.isLoggedIn !== prevProps.isLoggedIn)) {
      FB.XFBML.parse(document.getElementById('facebook-container'));
    }
  }

  render() {
    const {
      isLoggedIn,
      currentUrl
    } = this.props;
    return (
      <div id="facebook-container">
        { isLoggedIn &&
            <div className="facebook-button">
              <div className="fb-like" data-href={currentUrl} data-layout="button_count" data-action="like" data-size="large" data-share="true">
              </div>
            </div>
        }
          <div is
            class="fb-login-button facebook-button"
            data-show-faces="false"
            data-size="large"
            data-auto-logout-link="true"
            data-max-rows="1"
            data-scope="email"
            onlogin="fbLogin">
          </div>
        
      </div>
    );
  }
}


export default App;
