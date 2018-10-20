const assert = require('assert');
const regL = require('../regLogic');
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

describe('Tests the functionality of my reg app', async function () {
    beforeEach(async function () {
        await pool.query('delete from reg_number');
     });
   
    var regiz = regL(pool);
   assert.strictEqual(true, await regiz.getReg('CY 400 777'));
});
