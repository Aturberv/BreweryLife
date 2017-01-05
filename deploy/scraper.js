var config = require('../config.json');
var fs = require('fs');
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
    for(brewery in config.cities[city].breweries) {
        pageUrls.push(city + '/' + brewery);
    }
}

pageUrls.forEach(function(url) {
    driver.get('http://localhost:8080/' + url)
    driver.findElement(webdriver.By.tagName('html')).then(function(el) {
        el.getAttribute('outerHTML').then(function(html){
            console.log('Generating: ' + url);
            fs.writeFileSync('ssr/' + url, html);
        })
    }); 
});

driver.quit();