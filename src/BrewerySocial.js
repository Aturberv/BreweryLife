import React from 'react';
import {Icon} from 'react-fa';

import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	const socialTypes = {
		"facebook": social.facebook,
		"twitter": social.twitter,
		"instagram": social.instagram,
		"globe": social.website
	}
	return (
		<div>
			<span>
			{
				Object.keys(socialTypes).map((key) =>
					<a href={socialTypes[key]} key={key}>
						<Icon className="social-icon" name={ key } size='lg' />
					</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
