import React from 'react';
import Icon from 'react-fa';
import './Crosshairs.css';

const Crosshairs = ({ onClickRender }) => {
	return(
		<div>
			<Icon className="fa-crosshairs" name="crosshairs" size="2x" onClick={onClickRender} />
		</div>
	)
}

export default Crosshairs;