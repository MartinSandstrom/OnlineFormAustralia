var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
const until = webdriver.until;
var By = webdriver.By;
const TIMEOUT = 30000;
const URL = 'localhost:9000';


test.describe('Australian online form', function() {
    this.timeout(TIMEOUT);
    test.it('Should show the address for a correctly entered address', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('street')).sendKeys('63 Fletcher street');
        driver.findElement(By.name('suburb')).sendKeys('Tamarama');
        driver.findElement(By.name('postcode')).sendKeys('2026');
        driver.findElement(By.name('state')).sendKeys('NSW');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-address-view'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Should show validation error for leaving fields empty', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('');
        driver.findElement(By.name('postcode')).sendKeys('');
        driver.findElement(By.name('state')).sendKeys('');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-error-well'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Should show error message when no address was found', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Tamarama');
        driver.findElement(By.name('postcode')).sendKeys('2026');
        driver.findElement(By.name('state')).sendKeys('VIC');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-error-well'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Can find Ultimo 2007 NSW', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Ultimo');
        driver.findElement(By.name('postcode')).sendKeys('2007');
        driver.findElement(By.name('state')).sendKeys('NSW');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-address-view'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Can find Broadway 2007 NSW', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Broadway');
        driver.findElement(By.name('postcode')).sendKeys('2007');
        driver.findElement(By.name('state')).sendKeys('NSW');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-address-view'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Can not find Sydney 2007 NSW', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Sydney');
        driver.findElement(By.name('postcode')).sendKeys('2007');
        driver.findElement(By.name('state')).sendKeys('NSW');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-error-well'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Can find Ferntree Gully 3156 VIC', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Ferntree Gully');
        driver.findElement(By.name('postcode')).sendKeys('3156');
        driver.findElement(By.name('state')).sendKeys('VIC');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-address-view'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Can not find Ferntree Gully 3156 TAS', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Ferntree Gully');
        driver.findElement(By.name('postcode')).sendKeys('3156');
        driver.findElement(By.name('state')).sendKeys('TAS');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-error-well'))).then(()=> {
            driver.quit();
        });
    });

    test.it('Show correct not found message for a suburb with correct state, but incorrect postcode', () => {
        var driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get(URL);
        driver.findElement(By.name('suburb')).sendKeys('Melbourne');
        driver.findElement(By.name('postcode')).sendKeys('3002');
        driver.findElement(By.name('state')).sendKeys('VIC');
        driver.findElement(By.name('submit')).click();
        driver.wait(until.elementLocated(By.name('sel-error-well'))).then(()=> {
            driver.quit();
        });
    });
});
