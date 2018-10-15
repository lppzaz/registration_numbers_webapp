module.exports = function (pool) {
   async function getRegs () {
      let regs = await pool.query('select * from reg_numbers');
      return regs.rows;
   }

   async function clear () {
      const reset = await pool.query('delete from reg_numbers');
      return reset.rows;
   }
   async function addReg (reg) {
      if (reg && reg !== '') {
         reg = reg.toUpperCase();
         // CA 123 123
         let townTag = reg.substring(0, 3).trim();
         let foundTown = await pool.query('select id from towns where town_tag=$1 limit 1', [townTag]);
         if (foundTown.rowCount === 0) {
            return 'Invalid town';
         }
         // check for duplicates
         let foundReg = await pool.query('select id from reg_numbers where reg_number = $1', [reg]);
         if (foundReg.rowCount > 0) {
            return 'No Duplicates Allowed Sir!';
         }
         // if all is good - add the reg
         await pool.query('insert into reg_numbers(reg_number, town) values ($1, $2)', [reg, foundTown.rows[0].id]);
         return 'Registration added successfully!';
      }
      return 'Please Enter A Registration!!!';
   }
   async function filterTown (town) {
      town = town.toUpperCase();

      if (town === 'ALL') {
         return await getRegs();
      }

      let towns = await pool.query('select id from towns where town_tag = $1', [town]);
      if (towns.rowCount === 0) {
         return 'Invalid town';
      }
      // if town is valid - get the regs

      let regs = await pool.query('select * from reg_numbers where town = $1', [towns.rows[0].id]);
      return regs.rows;
   }

   return {
      getRegs,
      addReg,
      clear,
      filterTown
   };
};
