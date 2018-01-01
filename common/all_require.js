



  function gg () {

  var colour = require('colour');
  colour.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'cyan',
    data: 'grey',
    help: 'cyan',
    warn: ['yellow', 'underline'], // Applies two styles at once
    debug: 'blue',
    error: 'red bold' // Again, two styles
  });

var async = require('async');
//console.log(async);
// var bit2c = require('bit2c');
var Big = require('big.js');

var path = require('path');
/*var Log = require('log')
    , log = new Log('info');*/

var fs = require('fs')
    , Log = require('log')
    , log = new Log('debug', fs.createWriteStream('my.log'));

  re = {
    colour: colour,
    async: async,
    Big: Big,
    path: path,
    fs: fs,
    Log: Log,
    log: log
  };

  return re;

};
module.exports = gg();