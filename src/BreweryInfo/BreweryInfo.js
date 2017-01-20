import React from 'react';

const BreweryInfo = ({ info }) => {
	return(
		<div>
			<span>
        <div>
          <h5>{info.address.streetAddress}, {info.address.city} {info.address.state}, {info.address.postal}</h5>
          <center><h6>{info.phone}</h6></center>
        </div>
    		{
      			info.humanReadableHours.map((day) => 
              <div>{day}</div>
            )
    		}
    		</span>
    	</div>
	)
}

export default BreweryInfo;