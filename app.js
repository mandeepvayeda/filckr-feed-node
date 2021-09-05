const http = require('http');
const https = require('https');
const express = require('express')
const fs = require('fs');
var port = Number(process.env.PORT|| 5000);

const app = express()

app.listen(port);

app.set('view engine', 'ejs');

 app.get('/', (req, res) => {
	  
	 https.get('https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1', (resp) => {
	 resp.setEncoding('utf8');
	 let rawData = '';
	 resp.on('data', (chunk) => { rawData += chunk; });
	 console.log(rawData);
	 resp.on('end', () => {
		try {
			const parsedData = JSON.parse(rawData).items; 
			res.render('index', { parsedData });
		} catch (e) {
			console.error(e.message);
		}
	 });
	 
	});
});
