const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dist/index.html');
});

app.listen(9000, function() {
	console.info('App running on 9000!');
});

app.use('/', express.static('dist/'));
