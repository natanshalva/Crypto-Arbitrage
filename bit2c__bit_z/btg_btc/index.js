// DEBUG = false;
DEBUG = true;

var coin_name = 'BTG';
var STORE_NEGATIVE_RESOLES = false ;

// var run_in_loop = false;
 var run_in_loop = true;
var delay_in_milliseconds = 30000;

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
var bit2c = require('bit2c');
var Big = require('big.js');

console.log('Arber is runing ...'.info);

function run_in_loop_wrapper() {           //  create a loop function

  async.parallel([
        function get__bit_z_com(callback) {
          //  callback(null,1);
          /*   require('./exchanges/bit_z_com').then(function(foo){
              //Here code using foo;
               callback(foo);
            });*/

          var rp = require('request-promise');

          var options = {
            //  uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
            uri: 'https://www.bit-z.com/api_v1/depth?coin=btg_btc', qs: {
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
          bit2c.getOrderBook('BtgNis', function(error, getOrderBook) {
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
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
        //   DEBUG && console.log('results'.info, results);

        var   bit_z_com_depth = results[0];
        bit_z_com_depth.data.asks =   bit_z_com_depth.data.asks.reverse();
        // var gg = sss.reverse();
      //  DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_depth.data.asks);

        var bit2c_co_il_order_book = results[1];
      //  DEBUG && console.log('bit2c_co_il_order_book: ', bit2c_co_il_order_book);

        var bit2c_co_il_NIS_BTC = results[2];
      //  console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);



// function doStuff() {

// var async = require('async');
//  bit2c = require('bit2c');

// var bit_z_com = require('./exchanges/bit_z_com');
// DEBUG && console.log(bit_z_com);

//  var asdf = require('./exchanges/bit2c_co_il');
        //  console.log('ssssssssssss');

// the results array will equal ['one','two'] even though
// the second function had a shorter timeout.

//   DEBUG && console.log('results'.info, results);

// var bit_z_com_BTG_BTC = results[0];

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

       // var bit2c_co_il_order_book = results[1];
/*             var bit2c_co_il_order_book = {
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

        var total_quantity_BTG = 0;
        var total_profit = 0;

// the heights buy price of BTC with NIS in Bit2c
        var reference_point_BTC_v_r_i_NIS = bit2c_co_il_NIS_BTC.h;

        var orders_to_inspect = bit2c_co_il_order_book.asks;

        //  var USD_NIS = 3.49;

// start check with
        //--------------------------------------------------------
        //          functions
        //--------------------------------------------------------
        function print_margin_in_NIS(margin, quantity_available_for_trade,
            txt) {
          DEBUG && console.log('we are in print_margin_in_NIS'.info);
          DEBUG && console.log('margin: '.info, margin);
          DEBUG && console.log('quantity_available_for_trade: '.info,
              quantity_available_for_trade);
          var margin_in_BTC = price_in_BTC_times_quantity_in_coin(
              margin, quantity_available_for_trade);

          var print_BTC_in_NIS_v = print_BTC_in_NIS(margin_in_BTC,
              bit2c_co_il_NIS_BTC.h, txt);
          return print_BTC_in_NIS_v;
        };

        function quantity_available_for_trade(quantity_for_sell,
            quantity_available) {
          DEBUG && console.log('we are in: quantity_available_for_trade'.info);
          DEBUG && console.log('quantity_for_sell: '.info, quantity_for_sell);
          DEBUG && console.log('quantity_available: '.info, quantity_available);
          if (quantity_for_sell < quantity_available) {
            quantity = quantity_for_sell;
          } else {
            quantity = quantity_available;
          }
          return quantity;
        };



        function price_in_BTC_times_quantity_in_coin(margin, quantity) {
          DEBUG && console.log('      ');
          DEBUG && console.log('we are in price_in_BTC_times_quantity_in_coin');
          DEBUG && console.log('margin'.info, margin);
          // DEBUG && console.log('type of... margin'.info, typeof margin);
          DEBUG && console.log('quantity '.info, quantity);
          // DEBUG && console.log('type of...quantity '.info, typeof quantity);
          var re = margin * quantity;

          DEBUG && console.log('type of... '.info, typeof re);
          DEBUG && console.log('price_in_BTC_times_quantity_in_coin'.info, re);
          return re;
        }
        function margin_in_the_same_coin(margin, quantity) {
         var gg =  price_in_BTC_times_quantity_in_coin(margin, quantity) ;
         var x  = new Big(gg);
         var dd = x.times(bit_z_com_sorted.buy_quantity).toFixed(8) ;
         // this must reten a string
          return dd;
        }

        function print_BTC_in_NIS(value, buy_bitcoin_in_NIS, text) {
          DEBUG && console.log('in print_BTC_in_NIS'.info);
          DEBUG && console.log('buy_bitcoin_in_NIS: '.info, buy_bitcoin_in_NIS);
          DEBUG && console.log('value: '.info, value);
          var read_number_in_nis = parseFloat(value * buy_bitcoin_in_NIS).toLocaleString();
          console.log('--------------------------------------------------------'.grey);
          console.log(text.info, read_number_in_nis);
          console.log('--------------------------------------------------------'.grey);
          return read_number_in_nis;
        }


        function normalize_Bi2c(coin_value, trade_fee, bit2c_co_il_NIS_BTC) {
          DEBUG && console.log(' '.info );
          DEBUG && console.log('in normalize_Bi2c'.info );
          // http://mikemcl.github.io/big.js/

          // trade
          // sell BTG -> NIS  = 0.05%

          // withdraw
          // Buy NIS -> BTG  = 0.05%
          // add - withdrow fee : BTG 0.0001
          // add - buy BTC in Bit-z fee  : 0.999

          // convert to Big
          var b_coin_value = new Big(coin_value);
          DEBUG && console.log('coin_value: '.info ,parseFloat(b_coin_value ));

          var b_trade_fee = new Big(trade_fee);
          DEBUG && console.log('b_trade_fee: '.info ,parseFloat(b_trade_fee));

          var b_bitcoin_price = new Big(bit2c_co_il_NIS_BTC.h);
          DEBUG && console.log('b_bitcoin_price: '.info ,parseFloat(b_bitcoin_price));

          var b_buy_Other_coin_fee = new Big(0.995);
          DEBUG && console.log('b_buy_Other_coin_fee: '.info ,parseFloat(b_buy_Other_coin_fee));

          var b_BTG_withdraw_fee = new Big(0.0001);
          DEBUG && console.log('b_BTG_withdraw_fee : '.info ,parseFloat(b_BTG_withdraw_fee));


          
          var b_withdraw_fee_in_BTC =  ( b_BTG_withdraw_fee * b_coin_value)  / b_bitcoin_price ; // withdrow fee : BTG 0.0001
          DEBUG && console.log('b_withdraw_fee_in_BTC: '.info ,parseFloat(b_withdraw_fee_in_BTC));

          var b_buy_BTC_in_Bit_z_com = new Big(0.999);
          DEBUG && console.log('b_buy_BTC_in_Bit_z_com: '.info ,parseFloat(b_buy_BTC_in_Bit_z_com));
          // ----------------------------------------------------------------
          // start calculation
          // ----------------------------------------------------------------

          var coin_value_after_trade_fee =  (b_coin_value.times(b_trade_fee)); //sell/buy  coin * fee
          DEBUG && console.log('sell/buy  coin * fee: '.info ,parseFloat(coin_value_after_trade_fee));

          var value_in_BTC = coin_value_after_trade_fee.div(b_bitcoin_price); // NIS / bitcoin price
          DEBUG && console.log('NIS / bitcoin price: '.info ,parseFloat(value_in_BTC));

          var value_after_buy_other_coin = value_in_BTC.times(b_buy_Other_coin_fee); // buy Other coin to transfer the money out the exchange
          DEBUG && console.log('buy Other coin to transfer the money out the exchange: '.info ,parseFloat(value_after_buy_other_coin));

          var value_minus_withdraw_fee = value_after_buy_other_coin.minus(b_withdraw_fee_in_BTC); // withdraw fee
        //  var value_minus_withdraw_fee = value_after_buy_other_coin; // withdraw fee
          DEBUG && console.log('withdraw fee: '.info ,parseFloat(value_minus_withdraw_fee));
          
          var b = value_minus_withdraw_fee.times(b_buy_BTC_in_Bit_z_com);//  add - buy BTC in Bit-z.com fee  : 0.999
          DEBUG && console.log('after withdarw - buy BTC in Bit-z.com fee  : 0.999: '.info ,value_minus_withdraw_fee);


          // transfer Other coin fee not included ~ 0.0001 ;

          var re =  parseFloat(b);

          DEBUG && console.log('calculte the coin * fee / bitcoin price in NIS: '.info,re);
          return re  ;
        }

        function normalize_Bit_z_com(coin_value, trade_fee, withdraw_fee ) {
          // http://mikemcl.github.io/big.js/

          // sell BTG -> BTC  = 0.01%
          //  withdraw fee : 0.05% ( for BTC and for BTG )

        //  var trad_fee = 0.999 ;
        //  var withdraw_fee = 0.995 ;


          DEBUG && console.log('in normalize_Bit_z_com'.info );

          var b_coin_value = new Big(coin_value);
          DEBUG && console.log('b_coin_value: '.info ,parseFloat(b_coin_value ));

          var b_trade_fee = new Big(trade_fee);
          DEBUG && console.log('b_trade_fee: '.info ,parseFloat(b_trade_fee ));

          var b_withdraw_fee = new Big(withdraw_fee);
          DEBUG && console.log('b_withdraw_fee : '.info ,parseFloat(b_withdraw_fee ));

          // ---////////////////////////////////////////

          var after_trade_fee = b_coin_value.times(b_trade_fee) ; // trade fee
          DEBUG && console.log('after_trade_fee: '.info ,parseFloat(after_trade_fee));

          var after_withdraw_fee = after_trade_fee.times(b_withdraw_fee); // withdraw
          DEBUG && console.log('after_withdraw_fee: '.info ,parseFloat(after_withdraw_fee));

          var re =  parseFloat(after_withdraw_fee);

          DEBUG && console.log('(calculte the coin * fee ) * withdraw_fee : '.info,re);
          return re  ;
        }

        //  for (var i = 0; i < orders_to_inspect.length; i++) {

        for (var i = 0; i < 1; i++) {
          DEBUG && console.log(' ');
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
          console.log('                 start scale                            '.red);
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
          console.log('                                                         '.info);
          DEBUG && console.log('Start sort bit2c asks number:'.info, i);
          DEBUG && console.log('bit2c_co_il_order_book.asks : '.info, orders_to_inspect[i]);

          var coin_we_want_to_tread = null;
          var place_we_want_to_buy = null;
          var place_we_want_to_sell = null;
          var expenses_to_close_the_cycle = null;

          /*
                  // if the amaut to sell in the first row is higher then the limit...
                  if( ((total_quantity_BTG  + value[1]) * bit2c_co_il_order_book.bids[i][0] ) >  quantity_trade_limit_in_NIS){
                    DEBUG && console.log('the quantity of this row is: '.info, value[1]);
                    var aaaa  = quantity_trade_limit_in_NIS - (total_quantity_BTG * bit2c_co_il_order_book.bids[i][0]);
                    value[1] = aaaa /  bit2c_co_il_order_book.bids[i][0] ;
                    DEBUG && console.log('the quantity of this row is--- after trim to stand in the limit: '.green, value[1]);

                  }*/

          /*    if (i === 1) {
                DEBUG && console.log('we have been in the : i'.info, i);
                throw BreakException;
              }*/
          //------------------------------------------------------------
          //    Bi2c
          //------------------------------------------------------------

          var bi2c_sorted = require('./exchanges/bit2c_co_il.js')(
              bit2c_co_il_NIS_BTC, bit2c_co_il_order_book, coin_name, i, normalize_Bi2c);

          // ********************************************************************************
          //var string_sell_quantity = new Big(  bit_z_com_depth.data.bids[action_i][1]);

          var bit_z_com_sorted = require('./exchanges/bit_z_com.js')(
                bit_z_com_depth, coin_name, i, normalize_Bit_z_com);

          // ********************************************************************************
          //        finely calculation
          // ********************************************************************************
          DEBUG && console.log(' ');
          DEBUG && console.log('start calculation'.info);

          var buy_in_Bit_z_com__sell_in_Bi2c_price_margin = bi2c_sorted.u_can_sell_in_bi2c_for_BTC -
              bit_z_com_sorted.u_can_buy_in_Bit_z_com;

          DEBUG && console.log('buy_in_Bit_z_com__sell_in_Bi2c: '.info, buy_in_Bit_z_com__sell_in_Bi2c_price_margin);

          var buy_in_BI2C_sell_in_BIT_Z_COM = bit_z_com_sorted.u_can_sell_in_Bit_z_com - bi2c_sorted.u_can_buy_in_BI2C_for_BTC;
                  DEBUG && console.log('buy_in_BI2C_sell_in_BIT_Z_COM'.info, buy_in_BI2C_sell_in_BIT_Z_COM);
          //------------------------------------------------------------------------------------

          //------------------------------------------------------------------------------------
          //      buy_form: 'Bit-z.com -> sell in Bit2c.co.il
          //------------------------------------------------------------------------------------
          var quantity_available_for_trade_value;
          quantity_available_for_trade_value = quantity_available_for_trade(
              bi2c_sorted.sell_quantity, bit_z_com_sorted.buy_quantity);

          var margin_in_NIS = print_margin_in_NIS(
              buy_in_Bit_z_com__sell_in_Bi2c_price_margin,
              quantity_available_for_trade_value,
              'buy_in_Bit_z_com__sell_in_Bi2c - margin in NIS: ');

          var margin_in_the_same_coin_value = margin_in_the_same_coin( buy_in_Bit_z_com__sell_in_Bi2c_price_margin ,quantity_available_for_trade_value);

          var params_of_examine_to_store = {
            coin: coin_name ,
            buy_form: 'Bit-z.com',
            sell_in: 'bit2c.co.il',
            quantity: quantity_available_for_trade_value,
            profit: margin_in_the_same_coin_value,
          };
          require('./custom_moduls/store_data.js')(
              params_of_examine_to_store, STORE_NEGATIVE_RESOLES);


          //------------------------------------------------------------------------------------
          //      buy_form:  Bit2c.co.il -> sell in Bit-z.com
          //------------------------------------------------------------------------------------

          var quantity_available_for_trade_value_other_why = quantity_available_for_trade(
              bit_z_com_sorted.sell_quantity ,  bi2c_sorted.buy_quantity);
          var margin_in_the_same_coin_value_other_why = margin_in_the_same_coin( buy_in_BI2C_sell_in_BIT_Z_COM ,quantity_available_for_trade_value_other_why);

          var params_of_examine_to_store = {
            coin: coin_name ,
            buy_form: 'bit2c.co.il',
            sell_in: 'Bit-z.com',
            quantity: quantity_available_for_trade_value_other_why,
            profit: margin_in_the_same_coin_value_other_why,
          };

          DEBUG && console.log('params_of_examine_to_store: '.red ,
              params_of_examine_to_store);
          require('./custom_moduls/store_data.js')( params_of_examine_to_store, STORE_NEGATIVE_RESOLES);


        };

        DEBUG && console.log('  ');
        DEBUG && console.log('done...'.info);
        DEBUG && console.log('  ');
      }); // end
  if(run_in_loop){
    setTimeout(run_in_loop_wrapper, delay_in_milliseconds);
  }
};

run_in_loop_wrapper();