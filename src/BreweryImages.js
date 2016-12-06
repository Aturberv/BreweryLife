import React from 'react';
import { Carousel } from 'react-bootstrap';
import './BrewImage.css';

const BreweryImage = ({brewery}) => {
	return (
		<Carousel interval={0}>
			{
				brewery.photos.map((photo, idx) =>
					<Carousel.Item key={idx}>
						<img className="brew-images" key={idx} width={600} height={250} src={photo} role="presentation" />
					</Carousel.Item>
				)
			}
		</Carousel>
	);
}

export default BreweryImage;