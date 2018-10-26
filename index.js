const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3100;
var bodyParser = require('body-parser');
const Registrations = require("./regLogic");
const RegRoutes = require('./routes/regroutes');
const pg = require('pg');
const Pool = pg.Pool;
let useSSL = false;
if (process.env.DATABASE_URL) {
   useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postresql://cobus:cobus123@localhost:5432/registrations';

// triggering database request actions(open connection to db)

const pool = new Pool({
   connectionString,
   ssl: useSSL
});
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

const registrations = Registrations(pool)
const regroutes = RegRoutes(registrations)

app.get('/', regroutes.home);
app.post('/reg_numbers',regroutes.addReg);
app.get('/reg_numbers',regroutes.getReg);
app.get('/town/:town_tag',regroutes.filterTown);
app.get('/reset',regroutes.clear);


app.listen(PORT, function () {
   console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});
