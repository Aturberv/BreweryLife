import React from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import './BrewImages.css';

const BreweryImage = ({brewery}) => {
	return(
		<div className="row">
			<div className="row__inner">
			{
				brewery.photos.map((photo, idx) =>
					<div className="tile" key={idx}>
						<div className="tile__media">
							<img className="tile__image"
								src={photo} role="presentation"/>
						</div>
					</div>
				)
			}
			</div>
		</div>
	)
}


export default BreweryImage;