import React from 'react';
//import { Carousel } from 'react-bootstrap';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style/css'
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import './BrewImage.css';

const BreweryImage = ({brewery}) => {
	return (
		<Carousel arrows={true}
				  infinite={true}
				  accessibility={true}
				  nextArrow={<span><Icon type="right"/>omg</span>}
				  prevArrow={<span><Icon type="left"/>}omg</span>}	
				  dots={false}
				  lazyLoad={true}
				  swipe={true}
				  swipeToSlide={true}
				  >
			{
				brewery.photos.map((photo, idx) =>
					<div key={idx}>
						<img className="brew-images" key={idx} src={photo} role="presentation" />
					</div>
				)
			}
		</Carousel>
	);
}

export default BreweryImage;