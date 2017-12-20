DEBUG = true;
var take_timeout = 0;

// function doStuff() {
console.log('Arber is runing ...');


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
        bit2c.getTicker('BtgNis', function(error, ticker) {
          callback(null,ticker);
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
   //   DEBUG && console.log('results', results);

      var bit_z_com_BTG_BTC = results[0];
      DEBUG && console.log('bit_z_com_BTC_BTG: ', bit_z_com_BTG_BTC);

      var bit2c_co_il_BTG_NIS = results[1];
      DEBUG && console.log('bit2c_co_il_BTG_NIS: ', bit2c_co_il_BTG_NIS);

      var bit2c_co_il_NIS_BTC = results[2];
       console.log('bit2c_co_il_NIS_BTC: ', bit2c_co_il_NIS_BTC);

      //------------------------------------------------------------
      //------------------------------------------------------------
      function execute_bi2c_sort(bit2c_co_il_BTC_NIS,bit2c_co_il_BTG_NIS,coin) {

        DEBUG && console.log('sort:' ,coin);
        // https://www.bit2c.co.il/home/api

        var bi2c_sorted_in_function = {};
        bi2c_sorted_in_function.lowest_sell_order_BTG__in_bi2c   = bit2c_co_il_BTG_NIS.l ;
        bi2c_sorted_in_function.haighest_buy_order_BTG__in_bi2c   = bit2c_co_il_BTG_NIS.h ;

        // SELL BTC - to NIS
        // BUY BTG - with nis

        function normalize_Bi2c( coin_value, coin_fee, BTC_value_in_NIS, BTC_fee ) {
          return  ((coin_value*coin_fee) / (BTC_value_in_NIS * BTC_fee ) ) ;
        }

        bi2c_sorted_in_function.u_can_buy_BTG_in_BI2C_for_BTC = normalize_Bi2c(
            bi2c_sorted_in_function.lowest_sell_order_BTG__in_bi2c,
            1.005,
            bit2c_co_il_BTC_NIS.h,
            1.005
        );
      //  DEBUG && console.log('u_can_buy_BTG_in_BI2C_for_BTC',bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC);

        bi2c_sorted_in_function.u_can_sell_BTG__in_bi2c_for_BTC  =  normalize_Bi2c(
            bi2c_sorted_in_function.haighest_buy_order_BTG__in_bi2c ,
            0.995, // 0.5%
            bit2c_co_il_BTC_NIS.h ,
            0.995 // 0.5%
        );
      //  console.log( 'u_can_sell_BTG__in_bi2c_for_BTC ',bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC ) ;

        DEBUG && console.log('bi2c_sorted_in_function',bi2c_sorted_in_function);
        return bi2c_sorted_in_function;
      }

      var bi2c_sorted  =  execute_bi2c_sort(bit2c_co_il_NIS_BTC, bit2c_co_il_BTG_NIS , 'BTG');

      // ********************************************************************************
      // bit-z.com
      //  https://www.bit-z.com/about/fee
      // https://www.bit-z.com/api.html
      // the price - less the trade fee - and less Withdrawal fee
      u_can_sell_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC.data.buy * 0.999) * 0.995 ;
      DEBUG && console.log( 'u_can_sell_BTG_in_Bit_z_com' ,u_can_sell_BTG_in_Bit_z_com);

      u_can_buy_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC.data.sell * 1.001) * 1.005  ;
      DEBUG && console.log( 'u_can_buy_BTG_in_Bit_z_com' ,u_can_buy_BTG_in_Bit_z_com);

      // finely calculation

     var  buy__BTG__in_Bit_z_com__sell_in_Bi2c = bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC  - u_can_buy_BTG_in_Bit_z_com;
    DEBUG && console.log('buy__BTG__in_Bit_z_com__sell_in_Bi2c' , buy__BTG__in_Bit_z_com__sell_in_Bi2c ); 

     var  buy__BTG__in_BI2C_sell_in_BIT_Z_COM = u_can_sell_BTG_in_Bit_z_com  -  bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC;
      DEBUG && console.log('buy__BTG__in_BI2C_sell_in_BIT_Z_COM', buy__BTG__in_BI2C_sell_in_BIT_Z_COM);
     
      //------------------------------------------------------------------------------------
      function print_in_NIS(value, buy_bitcoin_in_NIS ,text ) {
        var read_number_in_nis = parseFloat(value *  buy_bitcoin_in_NIS ).toFixed(2)  ;
        console.log('--------------------------------------------------------');
        console.log( text ,  read_number_in_nis );
        console.log('--------------------------------------------------------');
      }

     print_in_NIS( buy__BTG__in_Bit_z_com__sell_in_Bi2c , bi2c_sorted.haighest_buy_order_BTG__in_bi2c ,
          'buy__BTG__in_Bit_z_com__sell_in_Bi2c - in NIS: ' );

      print_in_NIS( buy__BTG__in_BI2C_sell_in_BIT_Z_COM , bi2c_sorted.haighest_buy_order_BTG__in_bi2c ,
          'buy__BTG__in_BI2C_sell_in_BIT_Z_COM - in NIS: ' );

    });
// };

// function run() {
//  setInterval(doStuff, take_timeout);
// };

// run();