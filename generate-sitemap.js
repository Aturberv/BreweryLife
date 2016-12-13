var breweries = require('./breweryIds.json');
var xml = require('xml');
var fs = require('fs');
var async = require('async')

// <?xml version="1.0" encoding="UTF-8"?>

var siteMap = [{ urlset: [{}] }];

var siteMapObj = Object.keys(breweries).map(function(key){
	return {
		url: [{
			loc: `https://nycbrewerymap.com/${key}`
		}]
	}
})

var siteMap = [{ urlset: siteMapObj }]


setTimeout(function writeSiteMap() {
	console.log(siteMap)
	fs.writeFile('./public/sitemap.xml', xml(siteMap))
}, 3000);