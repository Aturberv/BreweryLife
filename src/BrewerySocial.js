import React from 'react';
import {Icon} from 'react-fa';

import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	const socialIcons = {
		"facebook": "facebook",
		"twitter": "twitter",
		"instagram": "instagram",
		"website": "globe"
	}

	return (
		<div>
			<span>
			{
				Object.keys(social).map((key) =>
					<a href={social[key]} key={key}>
						<Icon className="social-icon" name={ socialIcons[key] } size='2x' />
					</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
