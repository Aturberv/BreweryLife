var breweries = require('./src/breweries.json');
var URL = require('url');
var Yelp = require('yelp');
var GoogleMaps = require('@google/maps');
var extend = require('extend');
var async = require('async');
var fs = require('fs');

var yelp = new Yelp({
    consumer_key: 'yS3miNcNSEzOhVKG_e-G4g',
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: 'v9M6ILD3Cm3O7zzkcccl-7KhYFNwjD6u',
    token_secret: process.env.YELP_TOKEN_SECRET,
});

var googleMaps = GoogleMaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
})

var finalBreweriesList = []

async.forEach(breweries.Breweries, generateBrewery, writeFinalBreweryJson);

function writeFinalBreweryJson() {
    finalBreweriesList.sort((a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    });
    console.log(finalBreweriesList);
    fs.writeFile('test.json', JSON.stringify({"Breweries": finalBreweriesList}, null, 4));
}


function generateBrewery(brewery, completeCallback) {
    yelpQuery(brewery.yelpBusinessId)
        .then(parseYelpResponse)
        .then(joinBreweryWithResponse.bind(this, brewery))
        .then(appendFinalBrewery)
        .then(completeCallback)
        .catch(console.error)
}

function joinBreweryWithResponse(brewery, response) {
    // join reviews together
    response.reviews = response.reviews.concat(brewery.reviews);
    return extend(brewery, response);
}

function parseYelpResponse(business) {
    return new Promise(function(resolve, reject){
        try {
            resolve({
                rating: business.rating,
                numReviews: business.review_count,
                phone: business.display_phone,
                reviews: business.reviews
            });
        }
        catch (e){
            reject(e)
        }

    });
}

function yelpQuery(breweryName, cb) {
    return yelp.business(breweryName);
}

function appendFinalBrewery(brewery) {
    finalBreweriesList.push(brewery);
}


