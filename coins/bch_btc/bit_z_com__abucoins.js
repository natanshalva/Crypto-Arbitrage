DEBUG = false;
// DEBUG = true;

console.log('Arber is running ...');

var coin_name = 'BCH';
var pair_coin = 'BTC' ;

 var STORE_NEGATIVE_RESOLES = false ;
var counting_rounds = 0 ;
// var STORE_NEGATIVE_RESOLES = true ;

var DELAY_TIME = 5000;

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
          require('../../exchanges/get_exchange_data/bit_z_com.js')(callback,'bch_btc');
        }, function(callback) {

          require('../../exchanges/get_exchange_data/abucoins_com.js')(callback,DELAY_TIME,'BCH-BTC');

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

  helper_functions.loop_function(run_in_loop_wrapper,DELAY_TIME);

};

run_in_loop_wrapper();