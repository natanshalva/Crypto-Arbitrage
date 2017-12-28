
// process.exit();
/*var mongoDb =  MongoClient.connect( mongodbUrl, function (err, db) {


});*/

console.log('in config');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = require('../config.js');
console.log(mongodbUrl);
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( mongodbUrl , function( err, db ) {
      _db = db;
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};
/*   db.admin().authenticate('rami', 'pifpaf22', function () {
   })*/