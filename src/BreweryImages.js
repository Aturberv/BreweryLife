import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './BrewImages.css';

const BreweryImage = ({brewery}) => {

	const images = brewery.photos.map((photo) => {
		return {
			src: photo,
			lightboxImage:{
				src: photo
			}
		}
	});

	return(
		<Gallery photos={images} />
	)

}


export default BreweryImage;