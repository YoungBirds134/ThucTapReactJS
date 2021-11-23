'use strict';
module.exports = function(app) {
  let studentsCtrl = require('./controllers/StudentController');

  //  Routes
  app.route('/students')
  .get(studentsCtrl.get)
  .post(studentsCtrl.store);

  app.route('/students/:id')
    .get(studentsCtrl.detail)
    .put(studentsCtrl.update)
    .delete(studentsCtrl.delete);
  

  
};