
var App = require('./../../public/assets/app');

module.exports = function(app){
  app.get('*', function(req, res, next){
    console.log('----------------------', App);
    App(req, res);
  });

}
