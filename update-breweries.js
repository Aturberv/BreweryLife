var breweries = require('./src/breweries.json');
var URL = require('url');
var Yelp = require('yelp');
var GoogleMaps = require('@google/maps');
var extend = require('extend');
var async = require('async');
var fs = require('fs');
var http = require('http');

var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
});

var googleMaps = GoogleMaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
})

var finalBreweriesList = []

async.forEach(breweries.Breweries, generateBrewery, writeFinalBreweryJson);

function generateBrewery(brewery, completeCallback) {
    brewery.reviews = []; // reset reviews
    brewery.photos = [] // reset photos
    yelpQuery(brewery)
        .then(parseYelpResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(googlePlacesQuery)
        .then(parseGooglePlacesResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(appendFinalBrewery)
        .then(completeCallback)
        .catch(console.error)
}

function yelpQuery(brewery) {
    return yelp.business(brewery.yelpBusinessId);
}

function parseYelpResponse(business) {
    return {
                yelpRating: business.rating,
                yelpNumReviews: business.review_count,
                phone: business.display_phone,
                reviews: business.reviews.map(function(review){
                    return {
                        text: review.excerpt,
                        rating: review.rating
                    }
                })
            }
}

function googlePlacesQuery(brewery) {
    return googleMaps.place({ placeid: brewery.googlePlacesId}).asPromise();
}

function parseGooglePlacesResponse(response) {
    var place = response.json.result;
    var photoUrls = []
    var result = {
        googleRating: place.rating,
        googleUrl: place.url,
        geometry: place.geometry,
        reviews: place.reviews.map(function(review){
            return {
                text: review.text,
                rating: review.rating
            }
        }),
        photos: place.photos.map(function(photoReference){
            return 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
            photoReference.photo_reference +
            '&maxwidth=800&maxheight=800&key=' + process.env.GOOGLE_MAPS_API_KEY
        })
    };
    return result;
}

function writeFinalBreweryJson() {
    finalBreweriesList.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    });
    console.log(finalBreweriesList);
    fs.writeFile('./src/breweries.json', JSON.stringify({"Breweries": finalBreweriesList}, null, 4));
}

function joinBreweryWithResponse(brewery, response) {
    // join reviews and photos together
    if(response.reviews) response.reviews = response.reviews.concat(brewery.reviews);
    if(response.photos) response.photos = response.photos.concat(brewery.photos);
    return extend(brewery, response);
}


function appendFinalBrewery(brewery) {
    finalBreweriesList.push(brewery);
}
