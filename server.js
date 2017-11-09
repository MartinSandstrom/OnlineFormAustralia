const express = require('express');
const app = express();
const request = require('request');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});


//Something like this might be used if we decide to not go with heroku proxy :)
app.get('/data', (req, res) => {
    let URL = 'https://digitalapi.auspost.com.au/postcode/search?q=Melbourne&state=VIC';
    var headers = {
        'Auth-Key': 'ad52e4b6-5e22-42ba-bdbb-1882b9dacc77',
        'Content-Type': 'json'
    };
    request.get({
        url: URL,
        headers: headers
    }, (e, r, body) => {
		res.send(JSON.stringify(body));
    });
});

app.listen(9000, () => {
    console.info('App running on 9000!');
});

app.use('/', express.static('dist/'));
