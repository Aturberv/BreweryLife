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
    // reset
    brewery.reviews = brewery.reviews || []; 
    brewery.photos = brewery.photos || [];
    brewery.beers = brewery.beers || [];
    brewery.breweryRating = brewery.breweryRating || {};
    brewery.social = brewery.social || {};
    brewery.brewInfo = brewery.brewInfo || {};
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
        .catch(function(err){
            console.log(err)
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
            brewInfo: {
                phone: business.display_phone
            },
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
            brewInfo: {
                phone: place.formatted_phone_number,
                hours: place.opening_hours ? place.opening_hours.periods : {},
                humanReadableHours: place.opening_hours ? place.opening_hours.weekday_text : []
            },
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
    if(brewery.untappdBreweryId) {
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
    } else {
        return Promise.resolve(null);
    }  
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
                    rating: brewery.rating / 2
                } : {}
            },
            brewInfo: {
                phone: brewery.contact.formattedPhone,
                address: {
                    streetAddress: brewery.location.address,
                    postal: brewery.location.postalCode,
                    city: brewery.location.city,
                    state: brewery.location.state
                }
                // popularHours: brewery.popular.timeframes leaving this for future ref in case we decide we want it
                // have to slice the first object (the object is stored with 'today' for the date)
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
    if(response.brewInfo)
        for (var infoKey in response.brewInfo) {
            brewery.brewInfo[infoKey] = response.brewInfo[infoKey]
        }
        delete response.brewInfo
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
