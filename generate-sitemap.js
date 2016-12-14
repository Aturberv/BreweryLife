var breweries = require('./breweryIds.json');
var xml = require('xml');
var fs = require('fs');

var siteMap = [{ urlset: Object.keys(breweries).map(function(key){
    return {
        url: [{
            loc: `https://nycbrewerymap.com/${key}`
        }]
    }
}) }];

fs.writeFile('./public/sitemap.xml', xml(siteMap, { declaration: true }))