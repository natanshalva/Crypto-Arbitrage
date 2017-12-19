console.log('Arber is runing ...');
DEBUG = true;

var async = require('async');


// var bit_z_com = require('./exchanges/bit_z_com');
// DEBUG && console.log(bit_z_com);

// var bit2c_co_il = require('./exchanges/bit2c_co_il');
//DEBUG && console.log(bit2c_co_il);

async.parallel([
      function get__bit_z_com (callback) {
      /*   require('./exchanges/bit_z_com').then(function(foo){
          //Here code using foo;
           callback(foo);
        });*/

        var rp = require('request-promise');

        console.log('-------------------------------------------');
        console.log('-               bit-z.com                 -');
        console.log('-               btg_btc                   -');
        console.log('-------------------------------------------');

        var options = {
          uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
          qs: {
            access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
          },
          headers: {
            'User-Agent': 'Request-Promise'
          },
          json: true // Automatically parses the JSON string in the response
        };
        rp(options).then(function(da) {
          //  DEBUG && console.log(da);
          callback(null,da);
        }).catch(function(err) {
          // API call failed...
        });

      },
      function(callback) {
        setTimeout(function() {
          callback(null, 'two');
        }, 100);
      }
    ],
// optional callback
    function(err, results) {
      // the results array will equal ['one','two'] even though
      // the second function had a shorter timeout.
      DEBUG && console.log('results', results);
    });
