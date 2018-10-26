
module.exports = function (registrations) {
   async function home (req, res) {
      res.render('home', {
         reg_numbers: await registrations.getRegs() });
   };

   async function addReg (req, res) {
      let reg = req.body.registrate;
      let result = await registrations.addReg(reg);
      req.flash('noReg', result.message);
      res.render('home', {
         status: result.status,
         reg_numbers: await registrations.getRegs()
      });
   };

   async function getReg (req, res) {
      res.render('home', {
         reg_numbers: await registrations.getRegs()
      });
   };

   // reset route
   async function clear (req, res) {
      await registrations.clear();
      res.redirect('/');
   };

   async function filterTown (req, res) {
      let town = req.params.town_tag;

      res.render('home', {
         reg_numbers: await registrations.filterTown(town)
      });
   };
   return {
      home,
      addReg,
      getReg,
      filterTown,
      clear
   };
};
