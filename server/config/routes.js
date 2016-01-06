
var App = require('./../../public/assets/app.server');

module.exports = function(app){
  app.get('*', function(req, res, next){
    console.log('----------------------=================', App);
    App.default(req, res);
  });

}
