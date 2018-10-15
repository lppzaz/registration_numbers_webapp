const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 3100;
const pg = require('pg');
var bodyParser = require('body-parser');

const Registrations = require('./regLogic');

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
const connectionString = process.env.DATABASE_URL || 'postresql://cobus:cobus123@localhost:5432/registrations';

// triggering database request actions(open connection to db)

const pool = new Pool({
   connectionString,
   ssl: useSSL
});
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(bodyParser.json());

const registrations = Registrations(pool);

app.get('/', async function (req, res) {
   res.render('home');
});

app.post('/reg_numbers', async function (req, res) {
   let reg = req.body.registrate;

   req.flash('noReg', await registrations.addReg(reg));
   res.render('home', {
      reg_numbers: await registrations.getRegs()
   });
});

app.get('/reg_numbers', async function (req, res) {
   res.render('home', {
      reg_numbers: await registrations.getRegs()
   });
});

// reset route

app.get('/reset', async function (req, res) {
   await registrations.clear();
   res.redirect('/');
});

app.get('/:town_tag', async function (req, res) {
   let town = req.params.town_tag;

   res.render('home', {
      reg_numbers: await registrations.filterTown(town)
   });
});

app.listen(PORT, function () {
   console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});
