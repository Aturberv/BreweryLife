import React from 'react';
import Icon from 'react-fa';
import config from '../../config.json'
import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	return (
		<div>
			<span>
			{
			Object.keys(social).map((key) =>
				<a href={social[key]} key={key} target="_blank">
					<Icon className="social-icon" name={ config.socialIcons[key] } size='2x' />
				</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
