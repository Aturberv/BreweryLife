var breweries = require('./breweryIds.json');
var xml = require('xml');
var fs = require('fs');
var async = require('async')

var homeLink = {
    url: [
        {loc:"https://nycbrewerymap.com/"},
        {lastmod: new Date().toISOString()},
        {changefreq: "daily"},
        {priority:1.0}
    ]
}
var brewLinks = Object.keys(breweries).map(function(key){
                            return {
                                url: [
                                    {loc: `https://nycbrewerymap.com/${key}`},
                                    {lastmod: new Date().toISOString()},
                                    {changefreq: "daily"}
                                ]
                            }
                        });

var siteMap = [{ urlset: [{_attr:{xmlns:"http://www.sitemaps.org/schemas/sitemap/0.9"}}].concat(homeLink).concat(brewLinks) }]


fs.writeFile('./public/sitemap.xml', xml(siteMap, { declaration: true }))