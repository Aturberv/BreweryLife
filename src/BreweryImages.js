import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './BrewImages.css';

const BreweryImage = ({brewery}) => {
	const images = brewery.photos.map((photo) => {return {original: photo}});

	return (
		<Row>
		<Col lg={8} lgOffset={2}
			 md={10} mdOffset={1} 
			 sm={12}>
			<ImageGallery items={images}
						  lazyLoad={true}
						  showThumbnails={false}
						  showPlayButton={false}/>
		</Col>
	    </Row>
	);
}

export default BreweryImage;