//use strict;
//var prettyjson = require('prettyjson');
var async = require('async');
// var request = require('request');

module.exports = new Promise((resolve, reject) => {
  async.function(function(response) {
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
      resolve(da);
    }).catch(function(err) {
      // API call failed...
    });

    /*    request(url, function(error, response, body) {
          const objectBody = JSON.parse(body);
          const util = require('util');

          var niceBody = util.inspect(objectBody, {depth: null, colors: true});

          var dataToPrint = {
            url: url,
            error: error,
            statusCode: response && response.statusCode,
            body: niceBody
          };

          var options = {
            noColor: false
          };

          console.log(prettyjson.render(dataToPrint, options));

          //https://www.bit-z.com/about/fee
          // trade fee 0.1%
          //withdrow = 0.5%

      //    var bit_z_com = {};

    /!*        bit_z_com.buy__BTG = (objectBody.data.sell * 0.999 ) * 0.995;
            console.log(' buy BTG in bit-z.com price in BTC - after fee :',
                bit_z_com.buy__BTG);
            bit_z_com.sell__BTG = (objectBody.data.buy * 0.999 ) * 0.995;
            console.log('SEll -  BTG in bit-z.com price in BTC - after fee :',
                bit_z_com.sell__BTG);*!/
        });*/
});

});

//module.exports  =  gg();




