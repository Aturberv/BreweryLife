require('chromedriver');
var breweries = require('./breweryIds.json');
var fs = require('fs');
var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var pageUrls = ['index.html'].concat(Object.keys(breweries));

pageUrls.forEach(function(url) {
    driver.get('http://localhost:8080/' + url)
    driver.findElement(By.tagName('html')).then(function(el) {
        el.getAttribute('outerHTML').then(function(html){
            console.log('Generating: ' + url);
            fs.writeFileSync('ssr/' + url, html);
        })
    }); 
});

driver.quit();