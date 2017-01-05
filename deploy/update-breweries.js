var config = require('../config.json');
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

var untappd = new UntappdClient(false);
untappd.setClientId(process.env.UNTAPPD_CLIENT_ID)
untappd.setClientSecret(process.env.UNTAPPD_CLIENT_SECRET)

var foursquareClientId = process.env.FOURSQ_CLIENT_ID
var foursquareClientSecret = process.env.FOURSQ_CLIENT_SECRET

var foursquare = (require('foursquarevenues'))(foursquareClientId, foursquareClientSecret)

var finalBreweriesList = {};

for(city in config.cities) {
    finalBreweriesList[city] = {};
    generateBreweriesForCity(config.cities[city].breweries, city);
}


function generateBreweriesForCity(breweries, city) {
    async.eachOf(breweries, generateBrewery.bind(this, city), writeFinalBreweryJson);    
}


function generateBrewery(city, brewery, breweryKey, completeCallback) {    
    brewery.reviews = []; // reset reviews
    brewery.photos = []; // reset photos
    brewery.beers = []; // reset beers
    brewery.breweryRating = {};
    brewery.social = {};
    yelpQuery(brewery)
        .then(parseYelpResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(googlePlacesQuery)
        .then(parseGooglePlacesResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(queryUntappd)
        .then(parseUntappdResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(foursquareQuery)
        .then(parseFoursquareResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(appendFinalBrewery.bind(this, city, breweryKey))
        .then(completeCallback)
        .catch(function(){
            process.exit(1);
        });
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
            breweryRating: {
                yelp: business.rating ? {
                    rating: business.rating,
                    reviewCount: business.review_count
                } : {}
            },
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
            breweryRating: {
                google: place.rating ? {
                    rating: place.rating,
                } : {}
            },
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
        breweryRating: {
            untappd: brewery.rating.rating_score ? {
                rating: brewery.rating.rating_score,
            } : {}
        },
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

function foursquareQuery(brewery) {
    return new Promise(function(resolve, reject){
        if(!brewery.foursquareVenueId) {
            resolve(null);
            return;
        }

        foursquare.getVenue({'venue_id': brewery.foursquareVenueId}, function(error, venue){
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(venue);
            }
        })
    });
}

function parseFoursquareResponse(response) {
    if(response){
        var brewery = response.response.venue;
        return result = {
            breweryRating: { 
                foursquare: brewery.rating ? {
                    rating: brewery.rating
                } : {}
            },
            social: {foursquare: brewery.shortUrl},
            userTips: brewery.tips.groups ? 
                        brewery.tips.groups[0].items
                        .filter(function (tipObj) {
                            if(tipObj.agreeCount > tipObj.disagreeCount && tipObj.agreeCount > 2) {
                                return tipObj
                            }
                        })
                        .map(function(tip) {
                            if (tip.agreeCount > tip.disagreeCount && tip.agreeCount > 2) {
                                return {
                                    tip: tip.text,
                                    agreeCount: tip.agreeCount
                                }
                            }
                    }) 
                    : 
                    {},
            tags: brewery.tags,
            breweryAttributes: brewery.attributes.groups.map(function(info){
                return {
                    type: info.type,
                    name: info.name,
                    summary: info.summary
                }
            })
        };
    }
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
    if(response.breweryRating) 
        for (var ratingKey in response.breweryRating) {
            brewery.breweryRating[ratingKey] = response.breweryRating[ratingKey]
        }
        delete response.breweryRating
    if(response.social)
        for(var socialKey in response.social) { 
            brewery.social[socialKey] = response.social[socialKey]
        }
        delete response.social
    return extend(brewery, response);
}

function appendFinalBrewery(city, breweryKey, brewery) {
    finalBreweriesList[city][breweryKey] = brewery;
}
