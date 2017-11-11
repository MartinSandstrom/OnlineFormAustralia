# OnlineFormAustralia

## Usage

### Install

```console
    $ npm install
```

### Build js in dev mode and start dev server

```console
    $ npm install nodemon -g
    $ npm start
```
### Start webpack in dev mode and watch files

```console
    $ npm run dev
```

### Deploy to https://martinsandstrom.github.io/OnlineFormAustralia/

```console
    $ npm install -g gh-pages
    $ npm run deploy
```

### Selenium tests

#### install mocha and run selenium script

```console
    $ npm install mocha -g
    $ npm run selenium
```


## Future improvements / TODOS

* The api requests are made with CORS Anywhere, an endpoint for fetching the data from the express server has been made. Consider making this the primary choice?

* If going with the express endpoint solution for CORS, caching the results for future use will be necessary

* How do we validate streetname? 

* Better validation feedback on wrong input formats

* Consider making it a PWA with faster first render

* Un-css/remove bootstrap for faster loading time

* Refactor dataService to something more explanatory once more than one service is in place

* Better client validation for input fields
