var Yelp = require('yelp');
var GoogleMaps = require('@google/maps');
var UntappdClient = require('node-untappd');
var async = require('async');


var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
});

var googleMaps = GoogleMaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
});

var untappd = new UntappdClient(false);
untappd.setClientId(process.env.UNTAPPD_CLIENT_ID)
untappd.setClientSecret(process.env.UNTAPPD_CLIENT_SECRET)

var foursquareClientId = process.env.FOURSQ_CLIENT_ID
var foursquareClientSecret = process.env.FOURSQ_CLIENT_SECRET

var foursquare = (require('foursquarevenues'))(foursquareClientId, foursquareClientSecret);

if (process.argv.length < 4) {
    console.log("Please use this script in the following way:\n");
    console.log("node search-brewery.js \"<brewery name>\" \"<city>\"");
    process.exit(1);
}

var breweryName = process.argv[2];
var city = process.argv[3];

var breweryJson = {};

async.parallel({
    yelpBusinessId: yelpSearch,
    googlePlacesId: googleSearch,
    untappdBreweryId: untappdSearch,
    foursquareVenueId: foursquareSearch
}
, function(err, result){
    console.log(JSON.stringify(result));
})


function yelpSearch(callback){
    yelp.search({
        term: breweryName,
        category_filter: 'breweries',
        location: city,
        limit: 1
    })
    .then(function(result){
        if(result.businesses && result.businesses.length>0){
            return callback(null, result.businesses[0].id);
        }
        callback(null, null);
    })
    .catch(console.error)
}

function googleSearch(callback){
    googleMaps.places({
        query: breweryName + ' ' + city,
        type: 'brewery'
    })
    .asPromise()
    .then(function(response){
        var results = response.json.results;
        if(results && results.length > 0){
            return callback(null, results[0].place_id);
        } 
        return callback(null, null);
    })
    .catch(console.error);    
}

function untappdSearch(callback) {
    untappd.brewerySearch(function(err, response){
        if(response.response &&
            response.response.brewery &&
            response.response.brewery.items.length > 0) {
            return callback(err, response.response.brewery.items[0].brewery.brewery_id);
        }
        callback(err, null);
    },{
        'q': breweryName,
        'limit': 1
    });  
}

function foursquareSearch(callback){
    foursquare.getVenues({
        query: breweryName,
        near: city,
        limit: 1
    }, function(err, response){
        if(response.response &&
            response.response.venues.length > 0) {
            return callback(err, response.response.venues[0].id);
        }
        callback(err, null);
    })   
}


