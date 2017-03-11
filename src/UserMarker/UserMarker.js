import React from 'react';
import Icon from 'react-fa';
import './UserMarker.css';

const UserMarker = () => {
	return(
		<div>
			<Icon className="fa-circle" name="circle" size="lg">
				<div className="user-marker-pulse" />
			</Icon> 
		</div>
	)
}

export default UserMarker;