const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

// Registering partials directory
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
	let now = new Date().toString();
	let log = `${now}: ${request.method} ${request.url}`
	console.log(`${now}: ${request.app.get('views')}`);
	console.log(`${request.method}; ${request.url}`);
	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to find or load file');
		}
	});

	next();	// next() is important, without next() the server will hang up
});
//
// app.use((request, response, next) => {
// 	response.render('maintenance.hbs', {
// 		issue: 'Maintenance Problem',
// 		message: 'We will be right back in a while.'
// 	});
// });

// Creating a HELPER for the curret year so that we dont have to menton again and agian
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

// Creating the HELPER as to not use partial many a times
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

// Rendering using templates and view engine
app.get('/', (request, response) => {
		// response.send('<h1>Hello express!</h1>');
		// response.send({
		// 	name: 'Kashish',
		// 	likes: 'cricket'
		// });
		response.render('home.hbs', {
			pageTitle: 'Home Page',
			name: 'Kashish'
		});
});

// Rendering using templates and view engine
app.get('/about', (request, response) => {
	// response.send('Welcome to About Page.');
	response.render('about.hbs', {
		pageTitle: 'About Page',
		name: 'Kashish'
	});
});

// Anothet example of express app.get() with json
app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Bad Gateway'
	});
});

// This is important line as it is what starts the server on the desired port number
app.listen(port, () => {
	console.log(`Starting server on port ${port}`);
});
