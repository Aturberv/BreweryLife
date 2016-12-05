import React from 'react';
import { Carousel } from 'react-bootstrap';

const BreweryImage = ({brewery}) => {
	const brewImages = brewery.photos.map((photo, idx) => {
		return (
			<Carousel.Item key={idx}>
				<img key={idx} width={600} height={250} src={photo} role="presentation" />
			</Carousel.Item>
		);
	});

	return (
		<Carousel>
			{brewImages}
		</Carousel>
	);
}

export default BreweryImage;