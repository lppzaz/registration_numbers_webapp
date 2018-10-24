const assert = require("assert");
const regL = require("../regLogic");
const pg = require("pg");

const Pool = pg.Pool;
let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}
const connectionString =
  process.env.DATABASE_URL ||
  "postresql://postgres:@localhost:5432/registrations";
// triggering database request actions(open connection to db)
const pool = new Pool({
  connectionString,
  ssl: useSSL
});

describe("Tests the functionality of my reg app", async function() {
  beforeEach(async function() {
    await pool.query("delete from reg_numbers");
  });

    it("should return status and message", async function() {
    var regiz = regL(pool);
    assert.deepEqual(await regiz.addReg('CY 400 777'), 
    {
        status: 'success',
        message: 'Registration added successfully!'
    });
  });
  it("should return  status and message", async function() {
    var regiz = regL(pool);
    assert.deepEqual(await regiz.addReg('CX 400 777'), 
    {
        status: 'error',
        message: 'Invalid town'
    });
  });
  it("should return status and message", async function() {
    var regiz = regL(pool);
    assert.deepEqual(await regiz.addReg(''), 
    {
        status: 'error',
        message: 'Please Enter A Registration!!!'
    });
  });
  it("should return status and message", async function() {
    var regiz = regL(pool);
    await regiz.addReg('CY 400 777')
    assert.deepEqual(await regiz.addReg('CY 400 777'), 
    {
        status: 'error',
        message: 'No Duplicates Allowed Sir!'
    });
  });
});
describe("It tests the functionality of getReg", async function() {
    beforeEach(async function() {
        await pool.query("delete from reg_numbers");
      });
      it("should get all registrations", async function(){
          var regiz = regL(pool);
          await regiz.addReg('CY 400 777');
          await regiz.addReg('CA 400 777');
          await regiz.addReg('CF 400 777');
          await regiz.addReg('CJ 400 777');

          let regs = await regiz.getRegs();

          for (let reg of regs) {
            delete reg.id;
            delete reg.town;
          }

          assert.deepEqual(regs, [
              {reg_number: 'CY 400 777'},
              {reg_number: 'CA 400 777'},
              {reg_number: 'CF 400 777'},
              {reg_number: 'CJ 400 777'}
          ])
      } )   
})

describe("It tests the functionality of filter", async function() {
    beforeEach(async function() {
        await pool.query("delete from reg_numbers");
      });
      it("should get filtered registrations", async function(){
          var regiz = regL(pool);
          await regiz.addReg('CY 400 777');
          await regiz.addReg('CY 420 777');
          await regiz.addReg('CY 430 777');
          await regiz.addReg('CA 400 777');
          await regiz.addReg('CF 400 777');
          await regiz.addReg('CJ 400 777');

          let regs = await regiz.filterTown("CY");

          for (let reg of regs) {
            delete reg.id;
            delete reg.town;
          }

          assert.deepEqual(regs, [
              {reg_number: 'CY 400 777'},
              {reg_number: 'CY 420 777'},
              {reg_number: 'CY 430 777'}
            
          ])
      } );
      it("should return  status and message", async function() {
        var regiz = regL(pool);
        assert.deepEqual(await regiz.addReg('CX 400 777'), 
        {
            status: 'error',
            message: 'Invalid town'
        });
      });
      it("should get all registrations", async function(){
        var regiz = regL(pool);
        await regiz.addReg('CY 400 777');
        await regiz.addReg('CY 420 777');
        await regiz.addReg('CY 430 777');
        await regiz.addReg('CA 400 777');
        await regiz.addReg('CF 400 777');
        await regiz.addReg('CJ 400 777');

        let regs = await regiz.filterTown("ALL");

        for (let reg of regs) {
          delete reg.id;
          delete reg.town;
        }

        assert.deepEqual(regs, [
            {reg_number: 'CY 400 777'},
            {reg_number: 'CY 420 777'},
            {reg_number: 'CY 430 777'},
            {reg_number: 'CA 400 777'},
            {reg_number: 'CF 400 777'},
            {reg_number: 'CJ 400 777'}
          
          
        ])
    } ) 
        
})

describe("It clears all current Regs", function(){
    it("should delete all regs in database", async function(){

        var regiz = regL(pool);
        await regiz.clear();

        assert.deepEqual(await regiz.getRegs(),[])
    })
})