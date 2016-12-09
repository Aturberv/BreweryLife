import React from 'react';
import {Icon} from 'react-fa';

import './BrewerySocial.css';

const BrewerySocial = ({ social }) => {
	return (
		<div>
			<span>
			{
				Object.keys(social).map((key) =>
					<a href={social[key]} key={key}>
						<Icon className="social-icon" name={ key } size='lg' />
					</a>
				)
			}
			</span>
		</div>
	)
}

export default BrewerySocial;
