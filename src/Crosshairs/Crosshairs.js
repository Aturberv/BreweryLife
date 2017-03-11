import React from 'react';
import Icon from 'react-fa';
import './Crosshairs.css';

const Crosshairs = ({ clickRender }) => {
	return(
		<div>
			<Icon className="fa-crosshairs" name="crosshairs" size="2x" onClick={clickRender} />
		</div>
	)
}

export default Crosshairs;