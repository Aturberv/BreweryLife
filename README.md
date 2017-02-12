# <a href="https://brewery.life" target="_blank">Brewery Life</a>

[<img src="https://travis-ci.org/travis-ci/travis-web.svg?branch=master">](https://travis-ci.org/Aturberv/BreweryLife/)
[![Coverage Status](https://coveralls.io/repos/github/Aturberv/BreweryLife/badge.svg?branch=master)](https://coveralls.io/github/Aturberv/BreweryLife?branch=master)


## Getting started

```
yarn install
yarn start
```

Browse to [localhost:3000](localhost:3000) and enjoy!

## Overview

[Brewery Life](https://brewery.life) is an entirely static site hosted on S3. All of the information displayed is scraped at build time and embedded into the App using webpack.

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

Our brewery data is aggregated from a number of different sources. It utilizes the hand picked breweries in `config.json` file to generate `src/breweries.json`. 

### Adding a new brewery

You'll need to add a new object to `config.json` in the following format:

```
{
    "BreweryName": {
        "yelpBusinessId": "string",
        "googlePlacesId": "string",
        "untappdBreweryId": "string",
        "foursquareVenueId": "string"
    }
}
```

You can get those ids using our script:

```
node deploy/search-brewery.js "brewery name" "city"
```

Paste the JSON result into `config.json`. If any of the results are null or don't make sense (sometimes the searches can be a bit wonky), try searching manually using the below techniques:

#### Yelp

You can retrieve the `yelpBusinessId` by searching Yelp for the brewery and extracting the part of the url after `https://yelp.com/biz/`.

#### Google

You can retrieve the `googlePlacesId` [here](https://developers.google.com/places/web-service/place-id).

#### Untappd

You can retrieve the `untappdBreweryId` by inspecting the URL you are routed to when searching for the brewery on [https://untappd.com](https://untappd.com).

#### Foursquare

You can retrieve the `foursquareVenueId` by looking at meta tags on the brewery's foursquare page.

You may find some breweries do not have profiles on all of these sites. The only required ID is the `untappdBreweryId`. If the place doesn't exist on Google Places, you'll have to hardcode the location object like this:

```
"location" {
   "lat": 12.1244
   "lng": 43.12313 
}
```
_You can include the `"valid": false` key to prevent people from catching Ubers to places we aren't 100% sure exist at that location._


## Deploying

Travis CI is responsible for deploying our code on every merge to master. Essentially, it runs:

```
./deploy/deploy.sh
```

This script is responsible for creating a sitemap, generating static versions of each URL (for SEO purposes), scraping location information, and
synchronizing the result to S3.

The content that is synchronized are the local `build/` and `ssr/` directories with the S3 folder in AWS. It also invalidates the CloudFront cache so that users get the updates more quickly.

## Shout outs!

Thanks to Greg at Untappd for giving us access to their [API](https://untappd.com/api/)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you have questions about webpack configuration, babel, etc. you should start there.

