var breweryIds = require('./breweryIds.json');
var URL = require('url');
var Yelp = require('yelp');
var GoogleMaps = require('@google/maps');
var extend = require('extend');
var async = require('async');
var fs = require('fs');
var http = require('http');
var UntappdClient = require('node-untappd');

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

var debug = false;

var untappd = new UntappdClient(debug);
var clientId = process.env.UNTAPPD_CLIENT_ID
var clientSecret = process.env.UNTAPPD_CLIENT_SECRET

untappd.setClientId(clientId)
untappd.setClientSecret(clientSecret)

var finalBreweriesList = {};

async.forEach(breweryIds, generateBrewery, writeFinalBreweryJson);

function generateBrewery(brewery, completeCallback) {
    brewery.reviews = []; // reset reviews
    brewery.photos = []; // reset photos
    brewery.beers = []; // reset beers
    brewery.breweryRating = {};
    yelpQuery(brewery)
        .then(parseYelpResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(googlePlacesQuery)
        .then(parseGooglePlacesResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(queryUntappd)
        .then(parseUntappdResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(appendFinalBrewery)
        .then(completeCallback)
        .catch(console.error)
}

function yelpQuery(brewery) {
    if (brewery.yelpBusinessId) {
        return yelp.business(brewery.yelpBusinessId);    
    } else {
        return Promise.resolve(null);
    }
    
}

function parseYelpResponse(business) {
    if (business) {
        return {
            yelp: business.rating ? {
                rating: business.rating,
                reviewCount: business.review_count
            } : {},
            phone: business.display_phone,
            reviews: business.reviews ? business.reviews.map(function(review){
                return {
                    text: review.excerpt,
                    rating: review.rating
                }
            }) : []
        }
    }
}

function googlePlacesQuery(brewery) {
    if(brewery.googlePlacesId) {
        return googleMaps.place({ placeid: brewery.googlePlacesId}).asPromise();    
    } else {
        return Promise.resolve(null);
    }
    
}

function parseGooglePlacesResponse(response) {
    if(response) {
        var place = response.json.result;
        var photoUrls = []
        var result = {
            google: place.rating ? {
                rating: place.rating,
                reviewCount: 0
            } : {},
            googleUrl: place.url,
            location: place.geometry.location,
            reviews: place.reviews ? place.reviews.map(function(review){
                return {
                    text: review.text,
                    rating: review.rating
                }
            }) : [],
            photos: place.photos ? place.photos.map(function(photoReference){
                return 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' +
                photoReference.photo_reference +
                '&maxwidth=800&maxheight=800&key=' + process.env.GOOGLE_MAPS_API_KEY
            }) : []
        };
        return result;
    }
}

function queryUntappd(brewery) {
    return new Promise(function(resolve, reject){
        untappd.breweryInfo(function(err, brew){
            if(err){
                console.log('err'+ err)
                reject(err);
            }
                resolve(brew);
        }, 
        {"BREWERY_ID": brewery.untappdBreweryId})
    })
}

function parseUntappdResponse(response) {
    var brewery = response.response.brewery;
    var breweryBeers = brewery.beer_list.items;
    var socialObj = brewery.contact;
    var result = {
        name: brewery.brewery_name,
        untappd: brewery.rating.rating_score ? {
            rating: brewery.rating.rating_score,
            reviewCount: 0
        } : {},
        breweryDescription: brewery.brewery_description,
        breweryLogo: brewery.brewery_label,
        social: {
                twitter: `https://twitter.com/${socialObj.twitter}`,
                instagram: `https://www.instagram.com/${socialObj.instagram}`,
                facebook: socialObj.facebook,
                website: socialObj.url
            },
        beers: breweryBeers.map(function(beerObj){
            return {
                beerName: beerObj.beer.beer_name,
                beerLabel: beerObj.beer.beer_label,
                beerStyle: beerObj.beer.beer_style,
                beerLabel: beerObj.beer.beer_label,
                beerDescription: beerObj.beer.beer_description,
                beerRating: beerObj.beer.rating_score,
                beerRatingCount: beerObj.beer.rating_count,
                beerABV: beerObj.beer.beer_abv,
                beerIBU: beerObj.beer.beer_ibu
            }
        }),
        // extract unique beer types from each brewery
        beerTypes: breweryBeers.map(function(beerObj){
            return beerObj.beer.beer_style;
        }).filter(function(value, index, self){
            return self.indexOf(value) === index;
        })
    };
    return result;
 }

function writeFinalBreweryJson() {
    console.log(finalBreweriesList);
    fs.writeFile('./src/breweries.json', JSON.stringify(finalBreweriesList, null, 4));
}

function joinBreweryWithResponse(brewery, response) {
    if(!response) return brewery
    // join reviews and photos together
    if(response.reviews) response.reviews = response.reviews.concat(brewery.reviews);
    if(response.photos) response.photos = response.photos.concat(brewery.photos);
    if(response.yelp) brewery.breweryRating['yelp'] = response.yelp;
    delete response.yelp
    if(response.google) brewery.breweryRating['google'] = response.google;
    delete response.google
    if(response.untappd) brewery.breweryRating['untappd'] = response.untappd;
    delete response.untappd
    return extend(brewery, response);
}

function appendFinalBrewery(brewery) {
    // we use the brewery names for routing, so get rid of whitespace
    finalBreweriesList[brewery.name.replace(/\s/g,'')] = brewery;
}
