// DEBUG = false;
DEBUG = true;

var colour = require('colour');
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
var take_timeout = 0;
var quantity_trade_limit_in_NIS = 1000;
var total_margin_in_BTC = 0;

// function doStuff() {
console.log('Arber is runing ...'.info);


var async = require('async');
var bit2c = require('bit2c');



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

        var options = {
          uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
          //uri: 'https://www.bit-z.com/api_v1/depth?coin=btg_btc',
          qs: {
            //   access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
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
        bit2c.getOrderBook('BtgNis', function(error, getOrderBook) {
          callback(null,getOrderBook);
        });
      },
      function(callback) {
        bit2c.getTicker('BtcNis', function(error, ticker) {
          callback(null,ticker);
        });
      }
    ],
// optional callback
    function(err, results) {
      // the results array will equal ['one','two'] even though
      // the second function had a shorter timeout.
      //   DEBUG && console.log('results'.info, results);

      // var bit_z_com_BTG_BTC = results[0];
      var bit_z_com_BTG_BTC = {
        code: 0,
        msg: 'Success',
        data:
            { date: 1514012423,
              last: '0.01300000',
              buy: '0.01300000',
              sell: '0.01819999',
              high: '0.01410004',
              low: '0.01300000',
              vol: '2.5691' } };

      DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_BTG_BTC);

      // var bit2c_co_il_BTG_NIS_order_book = results[1];
      var bit2c_co_il_BTG_NIS_order_book = {
        asks:
            [ [ 1065, 0.81003594, 1514008359 ],
              [ 1160, 0.95, 1514004596 ],
              [ 1199, 0.17867921, 1513933664 ]],
        bids:
            [ [ 1001.04, 1.0265727, 1514012415 ],
              [ 1000.04, 6.916, 1513992928 ],
              [ 977, 3.79529171, 1513968730 ]]
      };


      DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book: ', bit2c_co_il_BTG_NIS_order_book);

      // var bit2c_co_il_NIS_BTC = results[2];
      var bit2c_co_il_NIS_BTC = { h: 52310.01,
        l: 54999,
        ll: 54999,
        a: 156.39665432,
        av: 49138.04600734523 };

      console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);

      var total_quantity_BTG = 0 ;
      var total_profit = 0 ;

      // the heights buy price of BTC with NIS in Bit2c
      var reference_point_BTC_v_r_i_NIS =  bit2c_co_il_NIS_BTC.h;


    });

