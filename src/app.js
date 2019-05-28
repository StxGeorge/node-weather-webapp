const path = require('path');//native node module
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


//console.log(__dirname);
//below, the join method is part of the path module (see node docs)
//console.log(path.join(__dirname, '../public'));

const App = express();

//define paths for express
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set App to use hbs and templates
App.set('view engine', 'hbs');
App.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static files for express
App.use(express.static(publicPath));

//home or index route (root)
App.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

//about route
App.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'federico'
    });
});

//help route
App.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        mainh1: 'hbs help'
    });
});

App.get('/help*', (req, res) => {
    res.render('notFound', {
        title: 'Article not Found',
        mainh1: 'Help article not found!'
    });
});
/* App.get('', (req, res) => { //no longer in use because index.html is served above
    res.send('<h1>Hello!</h1>');//and has been removed altogether
});
 */
/* App.get('/help', (req, res) => {//also removed
    res.send([{
        name: 'Poroto',
        age: 'old'
    },
    123,
    ['a', 'b', 'C']
    ]);
}); */

/* App.get('/about', (req, res) => {//completely removed
    res.send('<h1>About Page!</h1>');
}); */

//weather route
App.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
        error: 'A valid address must be provided'
        });
    } 

    //latitude, longitude, location have been deestuctured from the response object    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({ error });//short hand syntax
        }
        //console.log('Error:', error);for testing only
        //console.log('Data:', data);
        forecast(latitude, longitude, (error, forecastData) => {

            if(error) {
                //console.log('Error:', error); for testing only
            //console.log('Data:', forecastData);
                return res.send({
                    error: error
                });
            }
            //console.log(location);
            //console.log(forecastData);
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastData
            });
        });
    });
    
});

App.get('/products', (req, res) => {
    if(!req.query.search) {
        //below the return statement is necessary to stop the function after the first
        //res is sent, otherwise i'll get an error for multiple headers whereas i can 
        //only send one res.
        return res.send({
            error: 'you must provide a search term'
        });
    }

    console.log(req.query.search);//the query prop is part of the req object, and the arguments
    //passed in the browser become automatically associated to it
    res.send({
        products: []
    });
});
//404 or page not found route, below, the * wildcard stand in as express as a way
//to match everything that is not included in the routes above and it has to be at
//the bottom
App.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Page Not Found',
        mainh1: '404 Page not found!'
    });
});


App.listen(3000, () => {
    console.log('Server is running on port 3000');
});