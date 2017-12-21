DEBUG = false;
var take_timeout = 0;
var quantity_trade_limit_in_NIS = 10000;
var total_margin_in_quantity = 0;

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
          //uri: 'https://www.bit-z.com/api_v1/depth?coin=btg_btc',
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

   //   DEBUG && console.log('results', results);



      var bit_z_com_BTG_BTC = results[0];
      DEBUG && console.log('bit_z_com_BTC_BTG: ', bit_z_com_BTG_BTC);

      var bit2c_co_il_BTG_NIS_order_book = results[1];
   //   DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book: ', bit2c_co_il_BTG_NIS_order_book);

      var bit2c_co_il_NIS_BTC = results[2];
    //   console.log('bit2c_co_il_NIS_BTC: ', bit2c_co_il_NIS_BTC);

      var total_quantity_in_BTG = 0 ;
      var total_profit = 0 ;

      // start check with

      //   run and check every asks -
      try {
      bit2c_co_il_BTG_NIS_order_book.asks.forEach(function(value,i){
     //   DEBUG && console.log('are we ? what is i? ', i );
        console.log('we start to check this asks element in the array ', value );

        if (i === 5) throw BreakException;
      //------------------------------------------------------------
      //    Bi2c
      //------------------------------------------------------------
      function execute_bi2c_sort(bit2c_co_il_BTC_NIS, bit2c_co_il_BTG_NIS_order_book,coin,action_i) {

        DEBUG && console.log('sort:' ,coin);

      //  DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book', bit2c_co_il_BTG_NIS_order_book);
        // https://www.bit2c.co.il/home/api

        var bi2c_sorted_in_function = {};
        bi2c_sorted_in_function.lowest_price_to_sell_BTG__in_bi2c   = bit2c_co_il_BTG_NIS_order_book.asks[action_i][0] ;
        bi2c_sorted_in_function.haighest_price_to_buy_BTG___in_bi2c   = bit2c_co_il_BTG_NIS_order_book.bids[action_i][0] ;

        // SELL BTC - to NIS
        // BUY BTG - with nis

        function normalize_Bi2c( coin_value, coin_fee, BTC_value_in_NIS, BTC_fee ) {
          return  ((coin_value*coin_fee) / (BTC_value_in_NIS * BTC_fee ) ) ;
        }

        bi2c_sorted_in_function.u_can_buy_BTG_in_BI2C_for_BTC = normalize_Bi2c(
            bi2c_sorted_in_function.lowest_price_to_sell_BTG__in_bi2c,
            1.005,
            bit2c_co_il_BTC_NIS.h,
            1.005
        );
      //  DEBUG && console.log('u_can_buy_BTG_in_BI2C_for_BTC',bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC);

        bi2c_sorted_in_function.u_can_sell_BTG__in_bi2c_for_BTC  =  normalize_Bi2c(
            bi2c_sorted_in_function.haighest_price_to_buy_BTG___in_bi2c ,
            0.995, // 0.5%
            bit2c_co_il_BTC_NIS.h ,
            0.995 // 0.5%

        );
      //  console.log( 'u_can_sell_BTG__in_bi2c_for_BTC ',bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC ) ;

        DEBUG && console.log('bi2c_sorted_in_function',bi2c_sorted_in_function);
        return bi2c_sorted_in_function;
      }


      DEBUG && console.log('start sort bit2c asks number:', i);
      var bi2c_sorted  =  execute_bi2c_sort(bit2c_co_il_NIS_BTC, bit2c_co_il_BTG_NIS_order_book , 'BTG', i);


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
     var  buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin = bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC  - u_can_buy_BTG_in_Bit_z_com;
    DEBUG && console.log('buy__BTG__in_Bit_z_com__sell_in_Bi2c' , buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin );

     var  buy__BTG__in_BI2C_sell_in_BIT_Z_COM = u_can_sell_BTG_in_Bit_z_com  -  bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC;
      DEBUG && console.log('buy__BTG__in_BI2C_sell_in_BIT_Z_COM', buy__BTG__in_BI2C_sell_in_BIT_Z_COM);
     
      //------------------------------------------------------------------------------------

      function price_dobel_quantity( margin , quantity ) {
        return parseFloat( margin  * quantity ).toFixed(6)  ;
      }

      function print_in_NIS(value, buy_bitcoin_in_NIS ,text ) {
        var read_number_in_nis = parseFloat(value * buy_bitcoin_in_NIS ).toFixed(2)  ;
        console.log('--------------------------------------------------------');
        console.log( text  ,  read_number_in_nis );
        console.log('--------------------------------------------------------');
      }

      // bit2c_co_il_BTG_NIS_order_book.asks[i][1]
      var margin_in_quantity  = price_dobel_quantity(buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin,bit2c_co_il_BTG_NIS_order_book.asks[i][1]);

     print_in_NIS( margin_in_quantity , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
          'buy__BTG__in_Bit_z_com__sell_in_Bi2c - margin in NIS: '  );

   //   var re  = price_dobel_quantity(buy__BTG__in_BI2C_sell_in_BIT_Z_COM,bit2c_co_il_BTG_NIS_order_book.asks[i][1]);

  //    print_in_NIS( re , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
 //         'buy__BTG__in_BI2C_sell_in_BIT_Z_COM - in NIS: ');


        if(buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin > 0 ){
          total_quantity_in_BTG = total_quantity_in_BTG + bit2c_co_il_BTG_NIS_order_book.asks[i][1] ;
           console.log('the total quantity in BTG is: ' , total_quantity_in_BTG);

          if( (total_quantity_in_BTG  * bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c) >  quantity_trade_limit_in_NIS){

            console.log('the total quantity in BTG - is over the limit...');
            console.log('sum : ');
            var total_quantity_of_BTG_show_in_NIS  = (total_quantity_in_BTG - bit2c_co_il_BTG_NIS_order_book.asks[i][1]) * bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c
            console.log('we need to invest :  ', total_quantity_of_BTG_show_in_NIS );
            print_in_NIS( total_margin_in_quantity  , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
                'total_profit (sum all margin ) - in NIS: ' );
            throw BreakException;
          }

          print_in_NIS( total_quantity_in_BTG , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
              'total_quantity ( sum all quantity that we need to buy )  - in NIS: ');
          //console.log('total amount to buy BTG : ' , total_amount  );

          total_margin_in_quantity = total_margin_in_quantity + margin_in_quantity ;
          print_in_NIS( total_margin_in_quantity  , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
              'total_profit (sum all margin ) - in NIS: ' );
          
        }else{
         console.log('ok, this is minus margin - we queit ');
          throw BreakException;
        }


      });
      } catch (e) {
        if (e !== BreakException) throw e;
      }

    });









// };

// function run() {
//  setInterval(doStuff, take_timeout);
// };

// run();