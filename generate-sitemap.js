var breweries = require('./breweryIds.json');
var xml = require('xml');
var fs = require('fs');

// var xmlString = xml(xmlObject, options);

var siteMap = [{ urlset: [{
	Object.keys(breweries).map(function(key){
		return {
			url: {
				loc: `https://nycbrewerymap.com/${key}` }
			}
		}
	})
	]}
]}

function writeSiteMap() {
	fs.writeFile('./src/sitemap.xml', xml(siteMap, options))
}