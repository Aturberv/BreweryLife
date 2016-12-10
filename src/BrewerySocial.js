import React from 'react';
import {Icon} from 'react-fa';

import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	const socialTypes = {
		"facebook": {
			icon: "facebook"
		},
		"twitter": {
			icon: "twitter"
		},
		"instagram": {
			icon: "instagram"
		},
		"website": {
			icon: "globe"
		}
	}

	return (
		<div>
			<span>
			{
				Object.keys(social).map((key) =>
					<a href={social[key]} key={key}>
						<Icon className="social-icon" name={ socialTypes[key].icon } size='lg' />
					</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
