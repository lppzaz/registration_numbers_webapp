const router = require('express').Router();
const Registrations = require('../regLogic');
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
router.get('/', async function (req, res) {
   res.render('home');
});

router.post('/reg_numbers', async function (req, res) {
   let reg = req.body.registrate;
   let result = await registrations.addReg(reg);
   req.flash('noReg', result.message);
   res.render('home', {
      status: result.status,
      reg_numbers: await registrations.getRegs()
   });
});

const registrations = Registrations(pool);
router.get('/reg_numbers', async function (req, res) {
   res.render('home', {
      reg_numbers: await registrations.getRegs()
   });
});

// reset route

router.get('/reset', async function (req, res) {
   await registrations.clear();
   res.redirect('/');
});

router.get('/town/:town_tag', async function (req, res) {
   let town = req.params.town_tag;

   res.render('home', {
      reg_numbers: await registrations.filterTown(town)
   });
});

module.exports = router;
