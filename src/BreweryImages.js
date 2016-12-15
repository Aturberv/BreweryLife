import React, { Component } from 'react';
import { ReactRpg } from 'react-rpg';
import "react-image-gallery/styles/css/image-gallery.css";
import './BrewImages.css';

const previewStyles = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  border: 'solid #1a1a1a 10px',
  zIndex: '3',
};

const ImagePreview = ({ url }) => <img src={url} style={previewStyles} alt={url} width="50%" height="auto" />;

class BreweryImage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popUp: false,
		};
	}

	getImages() {
		const brewery = this.props.brewery
		const images = brewery.photos.map((photo) => {
			return {
				url: photo,
				clickHandler: (url, obj) => {
					this.setState({ popUp: url });
					console.log(obj);
					setTimeout(() => this.setState({ popUp: false}), 1000)
				}
			}
		})
		return images;
	}

	render() {
		return (
			<div>

			{ this.state.popUp !== false ? <ImagePreview url={this.state.popUp} /> : null }

				<ReactRpg 
					imagesArray={this.getImages()} 
					columns={[1, 2, 5]} 
					padding={10} 
				/>
			</div>
		)
	}

}

export default BreweryImage;