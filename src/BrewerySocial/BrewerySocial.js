import React from 'react';
import Icon from 'react-fa';

import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	const socialIcons = {
		"facebook": "facebook",
		"twitter": "twitter",
		"instagram": "instagram",
		"website": "globe",
		"untappd": "beer",
		"yelp": "yelp",
		"google": "google"
	}

	return (
		<div>
			<span>
			{
			Object.keys(social).map((key) =>
				<a href={social[key]} key={key} target="_blank">
					<Icon className="social-icon" name={ socialIcons[key] } size='2x' />
				</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
