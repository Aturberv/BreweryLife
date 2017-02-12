import React from 'react';
import Helmet from 'react-helmet';

import config from '../../config.json';

const BreweryPageMeta = (
{
    brewery,
    currentUrl
}) => {
    return (
        <div>
          <meta itemProp="priceRange" content="$" />
          <meta itemProp="servesCuisine" content="beer" />
          {
            brewery.brewInfo.address &&
              <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                <meta itemProp="streetAddress" content={brewery.brewInfo.address.streetAddress} />
                <meta itemProp="addressLocality" content={brewery.brewInfo.address.city} />
                <meta itemProp="addressRegion" content={brewery.brewInfo.address.state} />
                <meta itemProp="postalCode" content={brewery.brewInfo.address.postal} />
              </div>
          }
          <meta itemProp="telephone" content={brewery.brewInfo.phone} />
          {
            brewery.brewInfo.hours && brewery.brewInfo.hours.map && 
            brewery.brewInfo.hours.map((day) =>
                <meta itemProp="openingHours" 
                      key={config.days[day.open.day].slice(0, 2)} 
                      content={`${config.days[day.open.day].slice(0, 2)} ${day.open.time}-${day.close.time}`} />
            )
          }

          <meta itemProp="name" content={brewery.name} />
          <meta itemProp="hasMap" content={currentUrl} />
          <meta itemProp="url" content={currentUrl} />
          <meta itemProp="logo" content={brewery.breweryLogo} />
          <meta itemProp="description" content={brewery.breweryDescription} />
          { 
            brewery.photos.length > 0 &&
              <meta itemProp="image" content={brewery.photos[0]} />
          }
          <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
              <meta itemProp="latitude" content={brewery.location.lat} />
              <meta itemProp="longitude" content={brewery.location.lng} />
          </div>
          <div itemProp="geo" itemScope itemType="http://schema.org/GeoCircle">
              <div itemProp="geoMidpoint" itemScope itemType="http://schema.org/GeoCoordinates">
                  <meta itemProp="latitude" content={brewery.location.lat} />
                  <meta itemProp="longitude" content={brewery.location.lng} />
              </div>
              <meta itemProp="geoRadius" content="40000" />
          </div>
          {
            brewery.breweryRating.yelp &&
              <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                <meta itemProp="ratingValue" content={brewery.breweryRating.yelp.rating}/>
                <meta itemProp="ratingCount" content={brewery.breweryRating.yelp.reviewCount}/>
              </div>
          }

          <Helmet
              meta={[
                {name:"description", content:brewery.breweryDescription},
                {property: "og:type", content:"restaurant.restaurant"},
                {property: "og:url", content:currentUrl},
                {property: "og:image", content:brewery.photos.length > 0 ? brewery.photos[0] : ''},
                {property: "og:description", content:brewery.breweryDescription},
                {property: "place:location:latitude", content:brewery.location.lat},
                {property: "place:location:longitude", content:brewery.location.lng},
                {property: "restaurant:price_rating", content:1},
                {property: "restaurant:cateogry", content:"brewery"},
                {property: "restaurant:cateogry", content:"beer"},
              ]}
            />
        </div>
    )
};

export default BreweryPageMeta;