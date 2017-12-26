// DEBUG = false;
DEBUG = true;
//var run_in_loop = false;
var run_in_loop = true;
var delay_in_milliseconds = 15000;

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

        var bit_z_com_BTG_BTC_depth = results[0];
        bit_z_com_BTG_BTC_depth.data.asks = bit_z_com_BTG_BTC_depth.data.asks.reverse();
        // var gg = sss.reverse();
        DEBUG && console.log('bit_z_com_BTC_BTG: '.info,
            bit_z_com_BTG_BTC_depth.data.asks);

        var bit2c_co_il_BTG_NIS_order_book = results[1];
        DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book: ',
            bit2c_co_il_BTG_NIS_order_book);

        var bit2c_co_il_NIS_BTC = results[2];
        console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);

        var take_timeout = 0;
        var quantity_trade_limit_in_NIS = 100000;
        var total_margin_in_BTC = 0;

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


       // var bit2c_co_il_BTG_NIS_order_book = results[1];
             var bit2c_co_il_BTG_NIS_order_book = {
               asks: [
                 [
                   1, 1.0000000, 1514008359,
                 ], [
                   1160, 0.95, 1514004596,
                 ], [
                   1199, 0.17867921, 1513933664,
                 ],
               ], bids: [
                 [
                   1, 1, 1514012415,
                 ], [
                   1000.04, 6.916, 1513992928,
                 ], [
                   977, 3.79529171, 1513968730,
                 ]
               ]
             };

             DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book: ',
                 bit2c_co_il_BTG_NIS_order_book);

       // var bit2c_co_il_NIS_BTC = results[2];
             var bit2c_co_il_NIS_BTC = {
               h: 52310.01, l: 54999, ll: 54999, a: 156.39665432, av: 49138.04600734523,
             };

             console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);
       */
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

        var total_quantity_BTG = 0;
        var total_profit = 0;

// the heights buy price of BTC with NIS in Bit2c
        var reference_point_BTC_v_r_i_NIS = bit2c_co_il_NIS_BTC.h;

        var orders_to_inspect = bit2c_co_il_BTG_NIS_order_book.asks;

        //  var USD_NIS = 3.49;

// start check with

        function print_margin_in_NIS(margin, quantity_available_for_trade,
            txt) {
          DEBUG && console.log('we are in print_margin_in_NIS'.info);
          DEBUG && console.log('margin: '.info, margin);
          DEBUG && console.log('quantity_available_for_trade: '.info,
              quantity_available_for_trade);
          var margin_in_BTC = price_in_BTC_dobel_quantity_in_BTG(
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



        function price_in_BTC_dobel_quantity_in_BTG(margin, quantity) {
          DEBUG && console.log('      ');
          DEBUG && console.log('we are in price_in_BTC_dobel_quantity_in_BTG');
          DEBUG && console.log('margin'.info, margin);
          // DEBUG && console.log('type of... margin'.info, typeof margin);
          DEBUG && console.log('quantity '.info, quantity);
          // DEBUG && console.log('type of...quantity '.info, typeof quantity);
          var re = margin * quantity;

          DEBUG && console.log('type of... '.info, typeof re);
          DEBUG && console.log('price_in_BTC_dobel_quantity_in_BTG'.info, re);
          return re;
        }
        function margin_in_the_same_coin(margin, quantity) {
         var gg =  price_in_BTC_dobel_quantity_in_BTG(margin, quantity) ;
         var x  = new Big(gg);
         var dd = x.times(bit_z_com_sorted.buy_quantity).toFixed(8) ;
          return dd;
        }

        function print_BTC_in_NIS(value, buy_bitcoin_in_NIS, text) {
          DEBUG && console.log('in print_BTC_in_NIS'.info);
          DEBUG && console.log('buy_bitcoin_in_NIS: '.info, buy_bitcoin_in_NIS);
          DEBUG && console.log('value: '.info, value);
          var read_number_in_nis = parseFloat(value * buy_bitcoin_in_NIS).
              toLocaleString();
          console.log(
              '--------------------------------------------------------'.grey);
          console.log(text.info, read_number_in_nis);
          console.log(
              '--------------------------------------------------------'.grey);
          return read_number_in_nis;
        }

        //  for (var i = 0; i < orders_to_inspect.length; i++) {
        for (var i = 0; i < 1; i++) {
          DEBUG && console.log(' ');
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
          console.log('                 start scale                            '.red);
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
          console.log('                                                         '.info);
          DEBUG && console.log('Start sort bit2c asks number:'.info, i);
          DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book.asks : '.info, orders_to_inspect[i]);

          /*
                  // if the amaut to sell in the first row is higher then the limit...
                  if( ((total_quantity_BTG  + value[1]) * bit2c_co_il_BTG_NIS_order_book.bids[i][0] ) >  quantity_trade_limit_in_NIS){
                    DEBUG && console.log('the quantity of this row is: '.info, value[1]);
                    var aaaa  = quantity_trade_limit_in_NIS - (total_quantity_BTG * bit2c_co_il_BTG_NIS_order_book.bids[i][0]);
                    value[1] = aaaa /  bit2c_co_il_BTG_NIS_order_book.bids[i][0] ;
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
              bit2c_co_il_NIS_BTC, bit2c_co_il_BTG_NIS_order_book, 'BTG', i);

          // ********************************************************************************
          //var string_sell_quantity = new Big(bit_z_com_BTG_BTC_depth.data.bids[action_i][1]);

          var bit_z_com_sorted = require('./exchanges/bit_z_com.js')(
              bit_z_com_BTG_BTC_depth, 'BTG', i);

          // ********************************************************************************
          // finely calculation
          // ********************************************************************************
          DEBUG && console.log(' ');
          DEBUG && console.log('start calculation'.info);
          var buy__BTG__in_Bit_z_com__sell_in_Bi2c_price_margin = bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC -
              bit_z_com_sorted.u_can_buy_BTG_in_Bit_z_com;

          DEBUG && console.log('buy__BTG__in_Bit_z_com__sell_in_Bi2c'.info,
              buy__BTG__in_Bit_z_com__sell_in_Bi2c_price_margin);

          /*        var buy__BTG__in_BI2C_sell_in_BIT_Z_COM = bit_z_com_sorted.u_can_sell_BTG_in_Bit_z_com - bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC;
                  DEBUG && console.log('buy__BTG__in_BI2C_sell_in_BIT_Z_COM'.info, buy__BTG__in_BI2C_sell_in_BIT_Z_COM);*/
          //------------------------------------------------------------------------------------

          var quantity_available_for_trade_value;
          quantity_available_for_trade_value = quantity_available_for_trade(
              bi2c_sorted.sell_quantity, bit_z_com_sorted.buy_quantity);

          var margin_in_NIS = print_margin_in_NIS(
              buy__BTG__in_Bit_z_com__sell_in_Bi2c_price_margin,
              quantity_available_for_trade_value,
              'buy__BTG__in_Bit_z_com__sell_in_Bi2c - margin in NIS: ');

          var margin_in_the_same_coin_value = margin_in_the_same_coin( buy__BTG__in_Bit_z_com__sell_in_Bi2c_price_margin ,quantity_available_for_trade_value);

          var params_of_examine_to_store = {
            coin: 'BTG',
            buy_form: 'Bit-z.com',
            sell_in: 'bit2c.co.il',
            quantity: quantity_available_for_trade_value,
            profit: margin_in_the_same_coin_value,
          };

          // start send
          if (buy__BTG__in_Bit_z_com__sell_in_Bi2c_price_margin > 0) {

            DEBUG && console.log('ok, we have pasitive number ');

            require('./custom_moduls/store_data.js')(
                params_of_examine_to_store);

            /*          total_quantity_BTG = total_quantity_BTG + bit2c_co_il_BTG_NIS_order_book.asks[i][1];
            console.log('the total quantity in BTG is: '.info, total_quantity_BTG);

            if ((total_quantity_BTG * bi2c_sorted.haighest_buy_BTG___in_NIS) >= quantity_trade_limit_in_NIS) {

              console.log('the total quantity in BTG - is over the limit...'.red);
              console.log('sum : '.info);
              var total_quantity_of_BTG_show_in_NIS = (total_quantity_BTG -
                  bit2c_co_il_BTG_NIS_order_book.asks[i][1]) *
                  bi2c_sorted.haighest_buy_BTG___in_NIS;

              console.log('we need to invest (NIS) :  '.info,
                  total_quantity_of_BTG_show_in_NIS);
              var total_profit_in_NIS = print_BTC_in_NIS(total_margin_in_BTC,
                  bi2c_sorted.haighest_buy_BTG___in_NIS,
                  'total_profit (sum all margin ) - in NIS: ');

              var bit2c_withdraw_fee_in_NIS = 0.0001 * bi2c_sorted.haighest_buy_BTG___in_NIS;

              DEBUG && console.log('withdraw fee in of 0.0001 BTG in nis '.info,
                  bit2c_withdraw_fee_in_NIS);
              var total_profit_in_NIS_after_withdraw = ( total_profit_in_NIS -
                  bit2c_withdraw_fee_in_NIS );

              console.log('total_profit_in_NIS_after_withdraw'.info,
                  total_profit_in_NIS_after_withdraw);

              break;
            }*/

            /*          print_BTC_in_NIS(total_quantity_BTG,
                          bi2c_sorted.haighest_buy_BTG___in_NIS,
                          'total_quantity ( sum all quantity that we need to buy )  - in NIS: ');*/
            //console.log('total amount to buy BTG : ' , total_amount  );

            // DEBUG && console.log('total_margin_in_BTC'.red , typeof total_margin_in_BTC );
            //  DEBUG && console.log('margin_in_BTC'.red , typeof margin_in_BTC  );

            /*          total_margin_in_BTC = total_margin_in_BTC + margin_in_BTC;
                      DEBUG && console.log('total_margin_in_BTC'.red, total_margin_in_BTC);
                      print_BTC_in_NIS(total_margin_in_BTC,
                          bi2c_sorted.haighest_buy_BTG___in_NIS,
                          'total_profit (sum all margin ) - in NIS: '.yellow);*/

          } else {
            console.log('ok, this is minus margin - we are out of this loop  ');
            DEBUG && console.log(' ');
            DEBUG && console.log('params_of_examine_to_store',
                params_of_examine_to_store);
            /*    require('./custom_moduls/store_data.js')( params_of_examine_to_store); */
            /*
                      var buy__BTG__in_BI2C_sell_in_BIT_Z_COM = bit_z_com_sorted.u_can_sell_BTG_in_Bit_z_com - bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC;
                      DEBUG && console.log('buy__BTG__in_BI2C_sell_in_BIT_Z_COM: '.info, buy__BTG__in_BI2C_sell_in_BIT_Z_COM);
                      DEBUG && console.log('sssss'.info);

                      DEBUG && console.log('bit_z_com_BTG_BTC_depth.data.bids[i][1]',bit_z_com_BTG_BTC_depth.data.bids[i][1]);
                      print_margin_in_NIS(
                          buy__BTG__in_BI2C_sell_in_BIT_Z_COM,
                          bit_z_com_BTG_BTC_depth.data.bids[i][1],
                          'buy__BTG__in_BI2C_sell_in_BIT_Z_COM - margin in NIS: '
                      );*/

            break;
          }

        };

        DEBUG && console.log('  ');
        DEBUG && console.log('...done'.info);

      }); // end
  if(run_in_loop){
    setTimeout(run_in_loop_wrapper, delay_in_milliseconds);
  }
};

run_in_loop_wrapper();