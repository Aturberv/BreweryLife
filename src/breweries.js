const Breweries = [
    {
        name: "Strong Rope Brewery",
        url: "http://strongropebrewery.com/",
        description: "Strong Rope Brewery and taproom serves hand-crafted ales in Gowanus, Brooklyn. As a New York state Farm Brewery, Strong Rope's ales range from reinterpretations of classic styles to seasonal varieties that utilize the best ingredients local farms have to offer.",
        location: {
            lat: 40.6768011,
            lng: -73.9862895,
            humanReadableAddress: '574A President Street Brooklyn, NY 11215'
        },
        rating: 4,
        reviews: 20,
        url: 'http://blah'
    },
    {
        name: "Threes Brewing",
        url: "http://www.threesbrewing.com/",
        description: "Threes Brewing is a brewery, bar & event space located in Gowanus, Brooklyn. Open 7 days a week with food, drink and programming, check back regularly for updates. We have a rotating kitchen residency where we bring in our favorite restaurants to take over our kitchen for a few weeks at a time.",
        location: {
            lat: 40.6797081,
            lng: -73.9843722,
            humanReadableAddress: '333 DOUGLASS ST, BROOKLYN, NY 11217'
        },
        yelp: {
            rating: 4,
            reviews: 187,
            url: 'https://www.yelp.com/biz/threes-brewing-brooklyn'
        }
    },
    {
        name: "Sixpoint Brewery",
        url: "http://www.sixpoint.com/",
        description: "Sixpoint Craft Ales was founded in 2004 by Shane Welch, a former homebrewer that originally grew up in Milwaukee. The microbrewery is located in a 7,000-square-foot (650 m2) factory in in Red Hook, Brooklyn that formerly manufactured filing cabinets. Sixpoint began business by only distributing kegs to local bars and restaurants; instead of bottling its beer, filling growlers at bars were the only way for customers to drink the beer at their homes.",
        location: {
            lat: 40.6739779,
            lng: -74.01192859999999,
            humanReadableAddress: '40 Van Dyke st Brooklyn, NY 11231'
        },
        yelp: {
            rating: 4.5,
            reviews: 26,
            url: 'https://www.yelp.com/biz/sixpoint-brewery-brooklyn'
        }
    },
    {
        name: "Other Half Brewing",
        url: "http://www.otherhalfbrewing.com/",
        description: "Craft Brewery specializing in IPA's and Sours",
        location: {
            lat: 40.6738735,
            lng: -73.99909219999999,
            humanReadableAddress: '195 Centre St Brooklyn, NY 11231'
        },
        yelp: {
            rating: 4,
            reviews: 103,
            url: 'https://www.yelp.com/biz/other-half-brewing-brooklyn?osq=Sixpoint+Brewery'
        }
    }
];

export default Breweries;