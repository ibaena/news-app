var express = require('express'),
    app = express();

var PORT = process.env.PORT || 8000;

//DEPENDENCIES
var exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    scraper = require('./config/scraper');
    leadscraper = require('./config/lead-scraper');
    db = require('./config/connection');

//SET HANDLEBARS ENGINE
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//BODYPARSER TO READ HTML
app.use(bodyParser.urlencoded({
  extended: false
}));

// SETUP LOGGER
app.use(morgan('dev'));

//SERVE FILES FROM PUBLIC DIR
app.use('/public', express.static(__dirname + "/public"));


app.listen(PORT, function() {
  console.log("Listening on PORT %s", PORT);
});


// Routing
var routes = require('./controllers/router');
var lead = require('./controllers/lead');
app.use('/', routes);
app.use('/', lead);
