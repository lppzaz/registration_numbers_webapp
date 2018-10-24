const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3100;

var bodyParser = require('body-parser');

const routes = require('./routes/routes');

app.use(express.static('public'));
app.engine('handlebars', exphbs({
   defaultLayout: 'main'
}));

app.use(session({
   secret: '<add a secret string here>',
   resave: false,
   saveUninitialized: true
}));

// initialise the flash middleware

app.use(flash());
//  set up database requirements

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());
app.use(routes);
app.listen(PORT, function () {
   console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});
