DEBUG = false;
//DEBUG = true;

console.log('Arber is running ...');

var coin_name = 'BCH';
var pair_coin = 'BTC' ;

var STORE_NEGATIVE_RESOLES = false ;
var counting_rounds = 0 ;
// var STORE_NEGATIVE_RESOLES = true ;

var delay_in_milliseconds = 5000;

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

//-------------------------------------------------------------------
//  log
//-------------------------------------------------------------------
/*
var Log = require('log')
    , log = new Log('info');

log.info('start run');
*/


var async = require('async');
// var bit2c = require('bit2c');
var Big = require('big.js');

var path = require('path');

var helper_functions = require('../common/helper_functions.js')(Big,colour);

// call normalize
var standard_normalized = require('../normelize/standard_normalized.js')(Big,colour);
var normalize_Bit_z_com = require('../normelize/bit_z_com.js')(Big,colour);

DEBUG && console.log('finish lode and start loop');

function run_in_loop_wrapper() {           //  create a loop function


  async.parallel([
        function get__bit_z_com(callback) {
          var rp = require('request-promise');
          var options = {
            //  uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
            uri: 'https://www.bit-z.com/api_v1/depth?coin=bch_btc', qs: {
              //   access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
            }, headers: {
              'User-Agent': 'Request-Promise',
            }, json: true // Automatically parses the JSON string in the response
          };
          rp(options).then(function(da) {
            //  DEBUG && console.log(da);
            callback(null, da);
          }).catch(function(err) {
            // API call failed...
          });
        }, function(callback) {

          const rp = require('request-promise');
          const crypto = require('crypto');

          const TIMEOUT = 5000;

          class Abucoins {
            constructor() {
              this.endpoint = 'https://api.abucoins.com';
              this.credentials = {
                key: '10513875-XZAEVTFUOK87G6192P3NYMDWSB05CHRJ',
                secret: 'LzRSRE13SnJXcCV0SV0xS0YpfTc9NXghWUIwKkUiPnw2PzwsT2BffkAmaFU5UUNn',
                passphrase: 'ij5tgkjdb',
              }
            }

            _jsonRequest(options) {
              options.timeout = TIMEOUT;
              options.json = true;

              return rp(options);
            }

            _getHeaders(sign, timestamp) {
              return {
                'AC-ACCESS-KEY': this.credentials.key,
                'AC-ACCESS-SIGN': sign,
                'AC-ACCESS-TIMESTAMP': timestamp,
                'AC-ACCESS-PASSPHRASE': this.credentials.passphrase,
              };
            }

            signAndRequest(method, path, body = {}) {
              const timestamp = Math.floor(new Date() / 1000);
              let options = {
                uri: `${this.endpoint}${path}`, method: method, body: body,
              };
              let string = timestamp + method + path;
              if (Object.keys(body).length > 0) {
                string += JSON.stringify(body);
              }
              const sign = crypto.createHmac('sha256',
                  Buffer.from(this.credentials.secret, 'base64')).
                  update(string).
                  digest('base64');
              options.headers = this._getHeaders(sign, timestamp);

              return this._jsonRequest(options);
            }
          }

          let abucoins = new Abucoins();
          let orders = abucoins.signAndRequest('GET', `/products/BCH-BTC/book?level=1`);

          orders.then((list) => {
            // console.log(list);
            callback(null, list );

          });


        },
      ], // optional callback
      function(err, results) {

        var   bit_z_com_depth = results[0];
        bit_z_com_depth.data.asks =   bit_z_com_depth.data.asks.reverse();
        // var gg = sss.reverse();
        //  DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_depth.data.asks);

        var abocoins_order_book = results[1];
        //  DEBUG && console.log('bit2c_co_il_order_book: ', bit2c_co_il_order_book);

        
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        // demo numbers !!!

        /*     var bit_z_com_BTG_BTC = {
               code: 0, msg: 'Success', data: {
                 date: 1514012423,
                 last: '0.01300000',
                 buy: '1.00000000',
                 sell: '0.5000000',
                 high: '0.01410004',
                 low: '0.01300000',
                 vol: '2.5691',
               }
             };

             DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_BTG_BTC);
       */

        // var abocoins_order_book= results[1];
        /*             var abocoins_order_book= {
                       asks: [
                         [
                           1, 4.0000000, 1514008359,
                         ], [
                           1160, 0.95, 1514004596,
                         ], [
                           1199, 0.17867921, 1513933664,
                         ],
                       ], bids: [
                         [
                           100000, 1, 1514012415,
                         ], [
                           1000.04, 6.916, 1513992928,
                         ], [
                           977, 3.79529171, 1513968730,
                         ]
                       ]
                     };

                     DEBUG && console.log('bit2c_co_il_order_book: ',
                         bit2c_co_il_order_book);*/

        // var bit2c_co_il_NIS_BTC = results[2];
        /*             var bit2c_co_il_NIS_BTC = {
                       h: 52310.01, l: 54999, ll: 54999, a: 156.39665432, av: 49138.04600734523,
                     };

                     console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);*/
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        
        for (var i = 0; i < 1; i++) {

          helper_functions.start(i);

          var exchange_a = require('../exchanges/abucoins_com.js')(
              i,
              coin_name,
              pair_coin,
              abocoins_order_book,
              standard_normalized,
              Big
          );

          // ********************************************************************************
          //var string_sell_quantity = new Big(  bit_z_com_depth.data.bids[action_i][1]);

          var exchange_b = require('../exchanges/bit_z_com.js')(
              bit_z_com_depth,
              coin_name,
              i,
              normalize_Bit_z_com
          );

          // ********************************************************************************
          //        finely calculation
          // ********************************************************************************
          DEBUG && console.log(' ');
          DEBUG && console.log('start calculation'.info);
          DEBUG && console.log(' ');


          var price_margin = exchange_a.u_can_sell - exchange_b.u_can_buy;

          DEBUG && console.log('price_margin: '.info, price_margin);

          var params_of_examine_to_store = require('./custom_moduls/prper_for_sending')(coin_name,pair_coin, exchange_a, exchange_b, price_margin,helper_functions);
          require('./custom_moduls/store_data.js')(params_of_examine_to_store, STORE_NEGATIVE_RESOLES);
          //------------------------------------------------------------------------------------

          var price_margin = exchange_b.u_can_sell - exchange_a.u_can_buy;
          DEBUG && console.log('price_margin'.info, price_margin);

          var params_of_examine_to_store = require('./custom_moduls/prper_for_sending')(coin_name,pair_coin, exchange_b  , exchange_a, price_margin,helper_functions);
          require('./custom_moduls/store_data.js')(params_of_examine_to_store, STORE_NEGATIVE_RESOLES);
        };

        counting_rounds = helper_functions.end_of_cycle(path,counting_rounds);

      }); // end

  helper_functions.loop_function(run_in_loop_wrapper,delay_in_milliseconds);

};

run_in_loop_wrapper();