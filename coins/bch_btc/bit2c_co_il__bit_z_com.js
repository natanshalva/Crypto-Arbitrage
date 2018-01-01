 DEBUG = false;
// DEBUG = true;

console.log('Arber is running ...');

var coin_name = 'BCH';
var pair_coin = 'NIS';

var STORE_NEGATIVE_RESOLES = false;
var counting_rounds = 0;
// var STORE_NEGATIVE_RESOLES = true ;

var delay_in_milliseconds = 5000;



var r = require('../../common/all_require');

var bit2c = require('bit2c');

var helper_functions = require('../../common/helper_functions.js')(r.Big,
    r.colour, r.log);

// call normalize
var normalize_Bi2c = require('../../normelize/bit2c_co_il.js')(r.Big,r.colour);
var normalize_Bit_z_com = require('../../normelize/bit_z_com.js')(r.Big,r.colour);

DEBUG && console.log('finish lode and start loop');

function run_in_loop_wrapper() {           //  create a loop function

  r.async.parallel([
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
          //  callback(null,1);
          bit2c.getOrderBook('BchNis', function(error, getOrderBook) {
            callback(null, getOrderBook);
          });
        }, function(callback) {
          // callback(null,1);
          bit2c.getTicker('BtcNis', function(error, ticker) {
            callback(null, ticker);
          });
        },
      ], // optional callback
      function(err, results) {

        var bit_z_com_depth = results[0];
        bit_z_com_depth.data.asks = bit_z_com_depth.data.asks.reverse();
        // var gg = sss.reverse();
        //  DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_depth.data.asks);

        var bit2c_co_il_order_book = results[1];
        //  DEBUG && console.log('bit2c_co_il_order_book: ', bit2c_co_il_order_book);

        var bit2c_co_il_NIS_BTC = results[2];
        //  console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);

        var orders_to_inspect = bit2c_co_il_order_book.asks;

        //  for (var i = 0; i < orders_to_inspect.length; i++) {

        for (var i = 0; i < 1; i++) {

          helper_functions.start(i);

          var exchange_a = require('../../exchanges/bit2c_co_il.js')(
              bit2c_co_il_NIS_BTC, bit2c_co_il_order_book, coin_name, i,
              normalize_Bi2c);

          // ********************************************************************************
          //var string_sell_quantity = new Big(  bit_z_com_depth.data.bids[action_i][1]);

          var exchange_b = require('../../exchanges/bit_z_com.js')(
              bit_z_com_depth, coin_name, i, normalize_Bit_z_com);

          // ********************************************************************************
          //        finely calculation
          // ********************************************************************************
          DEBUG && console.log(' ');
          DEBUG && console.log('start calculation'.info);

          var price_margin = exchange_a.u_can_sell_in_bi2c_for_BTC -
              exchange_b.u_can_buy;

          DEBUG &&
          console.log('buy_in_Bit_z_com__sell_in_Bi2c: '.info, price_margin);

          var params_of_examine_to_store = require(
              '../../common/prper_for_sending')(coin_name, pair_coin,
              exchange_a, exchange_b, price_margin, helper_functions);
          require('../../common/store_data.js')(params_of_examine_to_store,
              STORE_NEGATIVE_RESOLES);
          //------------------------------------------------------------------------------------

          var price_margin = exchange_b.u_can_sell -
              exchange_a.u_can_buy_in_BI2C_for_BTC;
          DEBUG &&
          console.log('buy_in_BI2C_sell_in_BIT_Z_COM'.info, price_margin);

          var params_of_examine_to_store = require(
              '../../common/prper_for_sending')(coin_name, pair_coin,
              exchange_b, exchange_a, price_margin, helper_functions);
          require('../../common/store_data.js')(params_of_examine_to_store,
              STORE_NEGATIVE_RESOLES);

        };

        counting_rounds = helper_functions.end_of_cycle(coin_name, pair_coin,
            r.path.basename(__filename), counting_rounds);

      }); // end

  helper_functions.loop_function(run_in_loop_wrapper, delay_in_milliseconds);

};

run_in_loop_wrapper();