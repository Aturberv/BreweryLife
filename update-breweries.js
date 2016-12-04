var breweries = require('./src/breweries.json');
var URL = require('url');
var Yelp = require('yelp');

var yelp = new Yelp({
    consumer_key: 'yS3miNcNSEzOhVKG_e-G4g',
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: 'v9M6ILD3Cm3O7zzkcccl-7KhYFNwjD6u',
    token_secret: process.env.YELP_TOKEN_SECRET,
});

var finalBreweriesJson = {

}

breweries.Breweries.forEach(generateBrewery);

function generateBrewery(brewery) {
    yelpQuery(brewery.name)
        .then(parseYelpResponse)
        .then(console.log)
        .catch(console.error)
}

function parseYelpResponse(response) {
    return new Promise(function(resolve, reject){
        try {
            var business = response.businesses[0];
            resolve({
                rating: business.rating,
                reviews: business.review_count,
                yelpUrl: business.url.split(/[?#]/)[0],
                phone: business.display_phone
            });
        }
        catch (e){
            reject(e)
        }

    });
}

function yelpQuery(breweryName, cb) {
    return yelp.search({ 
        term: breweryName,
        location: 'NYC',
        limit: 1,
    });
}


