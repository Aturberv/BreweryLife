import React from 'react';

import './BreweryInfo.css';

const BreweryInfo = ({ info }) => {
  return(
    <div className="brewery-info">
        {
          info.phone &&
            <div className="brewery-number">
              <h4>
                <a href={`tel:+1${info.phone.replace(/\D/g,'')}`}>
                {info.phone}
                </a>
              </h4>
            </div>
        }
        <div className="brewery-hours">
        {
          info.humanReadableHours &&
          info.humanReadableHours.map((day) =>
            <div key={day}><h5>{day}</h5></div>
          )
        }
        </div>
        <div className="brewery-address">
        {
          info.address &&
          <div>
            <a href={`https://maps.google.com/maps?q=` +
                    `${info.address.streetAddress} ${info.address.city}` +
                    `${info.address.state} ${info.address.postal}`}
               target="_blank">
              <h4>{info.address.streetAddress}<br/>
                  {info.address.city}, {info.address.state} {info.address.postal}
              </h4>
            </a>
          </div>
        }
        </div>
    </div>
  )
}

export default BreweryInfo;