var config = require('../config.json');
var fs = require('fs');
var cheerio = require('cheerio');
require('chromedriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('no-sandbox');

const builder = new webdriver.Builder();
builder.forBrowser('chrome');
builder.setChromeOptions(options);

const driver = builder.build();

var pageUrls = ['index.html'];

if (!fs.existsSync('ssr')){
    fs.mkdirSync('ssr');
}


for(city in config.cities){
    if (!fs.existsSync('ssr/'+city)){
        fs.mkdirSync('ssr/'+city);
    }
    //we should also generate pages for the cities
    //but need to figure that out later
    //pageUrls.push(city);
    for(brewery in config.cities[city].breweries) {
        pageUrls.push(city + '/' + brewery);
    }
}

pageUrls.forEach(function(url) {
    driver.get('http://localhost:8080/' + url)
    driver.findElement(webdriver.By.tagName('html')).then(function(el) {
        el.getAttribute('outerHTML').then(function(html){
            console.log('Generating: ' + url);

            // Google Maps throws a hissyfit on first load
            // so remove it from the DOM
            var $ = cheerio.load(html);
            var scripts = $('head').find('script').filter(function(i, el){
                var src = $(this).attr('src');
                if(src){
                    if(src.indexOf('maps.googleapis.com')!==-1){
                        return false;
                    }
                }
                return true;
            });
            $('head').find('script').replaceWith(scripts);
            fs.writeFileSync('ssr/' + url, $.html());
        })
    }); 
});

driver.quit();