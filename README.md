# <a href="https://nycbrewerymap.com/" target="_blank">NYC Brewery Map</a>

[<img src="https://travis-ci.org/travis-ci/travis-web.svg?branch=master">](https://travis-ci.org/Aturberv/NYCBeerMap/)
[![Coverage Status](https://coveralls.io/repos/github/Aturberv/NYCBeerMap/badge.svg?branch=master)](https://coveralls.io/github/Aturberv/NYCBeerMap?branch=master)


## Getting started

```
yarn install
npm run update-breweries
npm start
```

Browse to [localhost:3000](localhost:3000) and enjoy!

Getting an error while running `update-breweries`? See [below](#update-breweries).

## Overview

[NYC Brewery Map](nycbrewerymap.com) is an entirely static site hosted in S3. All of the information displayed is scraped at build time and embedded into the App using webpack.

## Accounts

We depend on the following APIs and expect corresponding API Keys in your environment variables.

### Yelp

```
YELP_CONSUMER_KEY
YELP_CONSUMER_SECRET
YELP_TOKEN
YELP_TOKEN_SECRET
```

### Google Places

`GOOGLE_MAPS_API_KEY`

### Untappd

```
UNTAPPD_CLIENT_ID
UNTAPPD_CLIENT_SECRET
```

### Foursquare
```
FOURSQ_CLIENT_ID
FOURSQ_CLIENT_SECRET
```

## Update Breweries

Our brewery data is aggregated from a number of different sources. It utilizes the hand picked breweries in `breweryIds.json` file to generate `src/breweries.json`. 

### Adding a new brewery

Add a new object to `breweryIds.json` in the following format:

```
{
    "BreweryNamePascalCamelCase": {
        "yelpBusinessId": "string",
        "googlePlacesId": "string",
        "untappdBreweryId": "string"
    }
}
```

You can retrieve the `yelpBusinessId` by searching Yelp for the brewery and extracting the part of the url after `https://yelp.com/biz/`.
You can retrieve the `googlePlacesId` [here](https://developers.google.com/places/web-service/place-id)
You can retrieve the `untappdBreweryId` by inspecting the URL you are routed to when searching for the brewery on [https://untappd.com](https://untappd.com).

You may find some breweries do not have profiles on all of these sites. The only required ID is the `untappdBreweryId`. If the place doesn't exist on Google Places, you'll have to hardcode the location object like this:
```
"location" {
   "lat": 12.1244
   "lng": 43.12313 
}
```
__You can include the `"valid": false` key to prevent people from catching Ubers to places we aren't 100% sure exist at that location.__


## Deploying

Travis CI is responsible for deploying our code on every merge to master. Essentially, it runs:

```
npm run update-breweries
npm run build
./deploy.sh
```

Which simply synchronizes the content of the local `build/` directory with the S3 folder in AWS. It also invalidates the CloudFront cache so that users get the updates more quickly.

## Shout outs!

Thanks to Greg at Untappd for giving us access to their [API](https://untappd.com/api/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you have questions about webpack configuration, babel, etc. you should start there.


## To Dos

1. Convert to a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/) by following the steps in [this repository](https://github.com/jeffposnick/create-react-pwa).

