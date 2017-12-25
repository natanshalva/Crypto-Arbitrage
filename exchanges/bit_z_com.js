
//var prettyjson = require('prettyjson');
var async = require('async');
// var request = require('request');


  async.function(function(response) {
    var rp = require('request-promise');

    var options = {
      // uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
      uri: 'https://www.bit-z.com/api_v1/tickerall',
      qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };

    rp(options).then(function(da) {
      DEBUG && console.log('ssss');
     // resolve(da);
    }).catch(function(err) {
      // API call failed...
    })





});


//module.exports  =  gg();




