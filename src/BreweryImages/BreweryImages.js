import React from 'react';
import './BrewImages.css';

const BreweryImage = ({photos}) => {
	return(
		<div className="brew-image-row">
			<div className="brew-image-row__inner">
			{
				photos.map((photo, idx) =>
					<div className="brew-image-tile" key={idx}>
						<div className="brew-image-tile__media" 
							 itemScope 
							 itemType="http://schema.org/ImageObject">
							<img className="brew-image-tile__image"
								 src={photo} 
								 role="presentation" 
								 itemProp="contentUrl" />
						</div>
					</div>
				)
			}
			</div>
		</div>
	)
}


export default BreweryImage;