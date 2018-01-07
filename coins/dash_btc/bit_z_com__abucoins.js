 DEBUG = false;
// DEBUG = true;

console.log('Arber is running ...');

var coin_name = 'DASH';
var pair_coin = 'BTC' ;

 var STORE_NEGATIVE_RESOLES = false ;
var counting_rounds = 0 ;
// var STORE_NEGATIVE_RESOLES = true ;

var delay_in_milliseconds = 5000;

var r = require('../../common/all_require');
//DEBUG && console.log(r);

var helper_functions = require('../../common/helper_functions.js')(r.Big,r.colour, r.log);

// call normalize
var standard_normalized = require('../../exchanges/normelize/standard_normalized.js')(r.Big,r.colour);
var normalize_Bit_z_com = require('../../exchanges/normelize/bit_z_com.js')(r.Big,r.colour);


DEBUG && console.log('finish lode and start loop');

function run_in_loop_wrapper() {           //  create a loop function


  r.async.parallel([
        function get__bit_z_com(callback) {
          var rp = require('request-promise');
          var options = {
            //  uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
            uri: 'https://www.bit-z.com/api_v1/depth?coin=dash_btc', qs: {
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
          let orders = abucoins.signAndRequest('GET', `/products/DASH-BTC/book?level=1`);

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

        for (var i = 0; i < 1; i++) {

          helper_functions.start(i);

          var exchange_a = require('../../exchanges/build_exchange_object/abucoins_com.js')(
              i,
              coin_name,
              pair_coin,
              abocoins_order_book,
              standard_normalized,
              r.Big
          );

          // ********************************************************************************
          //var string_sell_quantity = new Big(  bit_z_com_depth.data.bids[action_i][1]);

          var exchange_b = require('../../exchanges/build_exchange_object/bit_z_com.js')(
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

          var params_of_examine_to_store = require('../../common/prper_for_sending')(coin_name,pair_coin, exchange_a, exchange_b, price_margin,helper_functions);
          require('../../common/store_data.js')(params_of_examine_to_store, STORE_NEGATIVE_RESOLES);
          //------------------------------------------------------------------------------------

          var price_margin = exchange_b.u_can_sell - exchange_a.u_can_buy;
          DEBUG && console.log('price_margin'.info, price_margin);

          var params_of_examine_to_store = require('../../common/prper_for_sending')(coin_name,pair_coin, exchange_b  , exchange_a, price_margin,helper_functions);
          require('../../common/store_data.js')(params_of_examine_to_store, STORE_NEGATIVE_RESOLES);
        };

        counting_rounds = helper_functions.end_of_cycle(coin_name, pair_coin, r.path.basename(__filename),counting_rounds);

      }); // end

  helper_functions.loop_function(run_in_loop_wrapper,delay_in_milliseconds);

};

run_in_loop_wrapper();