var config = require('../config.json');
var xml = require('xml');
var fs = require('fs');
var async = require('async');

var homeLink = {
    url: [
        {loc:config.url},
        {lastmod: new Date().toISOString()},
        {changefreq: "daily"},
        {priority:1.0}
    ]
}
var brewLinks = [];

for(city in config.cities){
    brewLinks.push({
        url: [
            {loc: `${config.url}/${city}`},
            {lastmod: new Date().toISOString()},
            {changefreq: "daily"}
        ]
    });

    for(brewery in config.cities[city].breweries) {
        brewLinks.push({
            url: [
                {loc: `${config.url}/${city}/${brewery}`},
                {lastmod: new Date().toISOString()},
                {changefreq: "daily"}
            ]
        });
    }
}

var siteMap = [{ 
    urlset: [{
        _attr: {
            xmlns:"http://www.sitemaps.org/schemas/sitemap/0.9"
        }
    }]
    .concat(homeLink)
    .concat(brewLinks) 
}];


fs.writeFileSync('./public/sitemap.xml', xml(siteMap, { declaration: true }))