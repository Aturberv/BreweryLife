import React from 'react';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style/css'
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import './BrewImages.css';

const BreweryImage = ({brewery}) => {
	return (
		<Carousel arrows={true}
				  infinite={true}
				  accessibility={true}
				  nextArrow={<Icon type="right"/>}
				  prevArrow={<Icon type="left"/>}	
				  dots={false}
				  lazyLoad={true}
				  draggable={false} //disable dragging on desktop
				  swipeToSlide={true}
				  >
			{
				brewery.photos.map((photo, idx) =>
					<div key={idx}>
						<img className="brew-image" key={idx} src={photo} role="presentation" />
					</div>
				)
			}
		</Carousel>
	);
}

export default BreweryImage;