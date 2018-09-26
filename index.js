// const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3100;
const pg = require('pg');
var bodyParser = require('body-parser');

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

const Pool = pg.Pool;
let useSSL = false;
if (process.env.DATABASE_URL) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postresql://cobus:cobus123@localhost:5432/greetings';

// triggering database request actions(open connection to db)

const pool = new Pool({
    connectionString,
    ssl: useSSL
});
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.get('/', function (req, res) {
    res.render('home');
});

//logic section

// let RegLogic = require ("./regLogic")

//logic+database

//const regLog = regLogic(pool);

//file between logic and index route:

// const regRoutes = require("/regRoutesFile");

//what marries up routes + logic that takes in database

//const RegFactory = regRoutes(regLog);


app.use(bodyParser.json());
app.listen(PORT, function () {
    console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});
