module.exports = function (pool) {
   async function getRegs () {
      let regs = await pool.query('select * from reg_numbers');
      return regs.rows;
   }
   async function clear () {
      const reset = await pool.query('delete from reg_numbers');
      return reset.rows;
   }
   // inputLength() > 6 && event.keyCode === 13  -> way to limit length of reg?
   async function addReg (reg) {
      if (reg && reg !== '') {
         reg = reg.toUpperCase();
         // CA 123 123
         let townTag = reg.substring(0, 3).trim();

         let foundTown = await pool.query('select id from towns where town_tag=$1 limit 1', [townTag]);
         if (foundTown.rowCount === 0) {
            return 'Invalid town';
         }

         await pool.query('insert into reg_numbers(reg_number, town) values ($1, $2)', [reg, foundTown.rows[0].id]);
         return 'registration added successfully!';
      }
      return 'Please Enter A Registration!!!';
   }

   return {
      getRegs,
      addReg,
      clear
   };
};
