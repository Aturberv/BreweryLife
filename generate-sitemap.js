var breweries = require('./breweryIds.json');
var xml = require('xml');
var fs = require('fs');
var async = require('async')


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
	fs.writeFile('./public/sitemap.xml', xml(siteMap, { declaration: true }))
}, 3000);