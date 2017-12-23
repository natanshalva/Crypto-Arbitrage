// DEBUG = false;
DEBUG = true;

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

// the results array will equal ['one','two'] even though
// the second function had a shorter timeout.

//   DEBUG && console.log('results'.info, results);

// var bit_z_com_BTG_BTC = results[0];
var bit_z_com_BTG_BTC = {
  code: 0,
  msg: 'Success',
  data:
      {
        date: 1514012423,
        last: '0.01300000',
        buy: '0.01300000',
        sell: '0.01819999',
        high: '0.01410004',
        low: '0.01300000',
        vol: '2.5691'
      }};

DEBUG && console.log('bit_z_com_BTC_BTG: '.info, bit_z_com_BTG_BTC);

// var bit2c_co_il_BTG_NIS_order_book = results[1];
var bit2c_co_il_BTG_NIS_order_book = {
  asks:
      [
        [1065, 0.81003594, 1514008359],
        [1160, 0.95, 1514004596],
        [1199, 0.17867921, 1513933664]],
  bids:
      [
        [1001.04, 1.0265727, 1514012415],
        [1000.04, 6.916, 1513992928],
        [977, 3.79529171, 1513968730]]
};

DEBUG &&
console.log('bit2c_co_il_BTG_NIS_order_book: ', bit2c_co_il_BTG_NIS_order_book);

// var bit2c_co_il_NIS_BTC = results[2];
var bit2c_co_il_NIS_BTC = {
  h: 52310.01,
  l: 54999,
  ll: 54999,
  a: 156.39665432,
  av: 49138.04600734523
};

console.log('bit2c_co_il_NIS_BTC: '.info, bit2c_co_il_NIS_BTC);

var total_quantity_BTG = 0;
var total_profit = 0;

// the heights buy price of BTC with NIS in Bit2c
var reference_point_BTC_v_r_i_NIS = bit2c_co_il_NIS_BTC.h;

// start check with

//   run and check every asks -
try {
  bit2c_co_il_BTG_NIS_order_book.asks.forEach(function(value, i) {
    //  console.log('reference_point', reference_point);
    //   DEBUG && console.log('are we ? what is i? ', i );

    console.log(
        '                                                          '.info);
    console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
    console.log(
        '                                                          '.info);

    /*
            DEBUG && console.log('we start to check this asks element in the array '.info, value );
            // if the amaut to sell in the first row is higher then the limit...
            if( ((total_quantity_BTG  + value[1]) * bit2c_co_il_BTG_NIS_order_book.bids[i][0] ) >  quantity_trade_limit_in_NIS){
              DEBUG && console.log('the quantity of this row is: '.info, value[1]);
              var aaaa  = quantity_trade_limit_in_NIS - (total_quantity_BTG * bit2c_co_il_BTG_NIS_order_book.bids[i][0]);
              value[1] = aaaa /  bit2c_co_il_BTG_NIS_order_book.bids[i][0] ;
              DEBUG && console.log('the quantity of this row is--- after trim to stand in the limit: '.green, value[1]);

            }*/

    if (i === 1) {
      DEBUG && console.log('we have been in the : i'.info, i);
      throw BreakException;
    }
    //------------------------------------------------------------
    //    Bi2c
    //------------------------------------------------------------
    function execute_bi2c_sort(
        bit2c_co_il_BTC_NIS, bit2c_co_il_BTG_NIS_order_book, coin, action_i) {

      DEBUG && console.log('in sort:'.info, coin);

      //  DEBUG && console.log('bit2c_co_il_BTG_NIS_order_book', bit2c_co_il_BTG_NIS_order_book);
      // https://www.bit2c.co.il/home/api
      // https://www.bit2c.co.il/home/Fees

      var bi2c_sorted_in_function = {};
      bi2c_sorted_in_function.lowest_price_to_sell_BTG__in_bi2c = bit2c_co_il_BTG_NIS_order_book.asks[action_i][0];
      bi2c_sorted_in_function.haighest_price_to_buy_BTG___in_bi2c = bit2c_co_il_BTG_NIS_order_book.bids[action_i][0];

      // SELL BTC - to NIS
      // BUY BTG - with nis

      function normalize_Bi2c(
          coin_value, coin_fee, reference_point_BTC_v_r_i_NIS, BTC_fee) {
        //  return  ((coin_value*coin_fee) / (BTC_value_in_NIS * BTC_fee ) ) ;
        return ((coin_value * coin_fee) / reference_point_BTC_v_r_i_NIS  );
      }

      bi2c_sorted_in_function.u_can_buy_BTG_in_BI2C_for_BTC = normalize_Bi2c(
          bi2c_sorted_in_function.lowest_price_to_sell_BTG__in_bi2c,
          1.005,
          reference_point_BTC_v_r_i_NIS
      );
      //  DEBUG && console.log('u_can_buy_BTG_in_BI2C_for_BTC',bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC);

      bi2c_sorted_in_function.u_can_sell_BTG__in_bi2c_for_BTC = normalize_Bi2c(
          bi2c_sorted_in_function.haighest_price_to_buy_BTG___in_bi2c,
          0.995, // 0.5%
          reference_point_BTC_v_r_i_NIS,
          0.995 // 0.5%

      );
      //  console.log( 'u_can_sell_BTG__in_bi2c_for_BTC ',bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC ) ;

      DEBUG &&
      console.log('bi2c_sorted_in_function'.info, bi2c_sorted_in_function);
      return bi2c_sorted_in_function;
    }

    DEBUG && console.log('start sort bit2c asks number:'.info, i);
    var bi2c_sorted = execute_bi2c_sort(bit2c_co_il_NIS_BTC,
        bit2c_co_il_BTG_NIS_order_book, 'BTG', i);

    // ********************************************************************************
    // bit-z.com
    //  https://www.bit-z.com/about/fee
    // https://www.bit-z.com/api.html
    // the price - less the trade fee - and less Withdrawal fee
    u_can_sell_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC.data.buy * 0.999) * 0.995;
    DEBUG && console.log('u_can_sell_BTG_in_Bit_z_com'.info,
        u_can_sell_BTG_in_Bit_z_com);

    u_can_buy_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC.data.sell * 1.001) * 1.005;
    DEBUG &&
    console.log('u_can_buy_BTG_in_Bit_z_com'.info, u_can_buy_BTG_in_Bit_z_com);

    // finely calculation
    var buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin = bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC -
        u_can_buy_BTG_in_Bit_z_com;
    DEBUG && console.log('buy__BTG__in_Bit_z_com__sell_in_Bi2c'.info,
        buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin);

    var buy__BTG__in_BI2C_sell_in_BIT_Z_COM = u_can_sell_BTG_in_Bit_z_com -
        bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC;
    DEBUG && console.log('buy__BTG__in_BI2C_sell_in_BIT_Z_COM'.info,
        buy__BTG__in_BI2C_sell_in_BIT_Z_COM);

    //------------------------------------------------------------------------------------

    function price_in_BTC_dobel_quantity_in_BTG_of_this_price(margin,
                                                              quantity) {
      DEBUG && console.log('type of... margin'.info, typeof margin);
      DEBUG && console.log('type of...quantity '.info, typeof quantity);
      var re = margin * quantity;
      DEBUG && console.log('type of... '.info, typeof re);
      return re;
    }

    function print_BTC_in_NIS(value, buy_bitcoin_in_NIS, text) {
      var read_number_in_nis = parseFloat(value * buy_bitcoin_in_NIS).
          toFixed(2);
      console.log(
          '--------------------------------------------------------'.grey);
      console.log(text.info, read_number_in_nis);
      console.log(
          '--------------------------------------------------------'.grey);
      return read_number_in_nis;
    }

    // bit2c_co_il_BTG_NIS_order_book.asks[i][1]
    var margin_in_BTC = price_in_BTC_dobel_quantity_in_BTG_of_this_price(
        buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin,
        bit2c_co_il_BTG_NIS_order_book.asks[i][1]);

    print_BTC_in_NIS(margin_in_BTC,
        bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c,
        'buy__BTG__in_Bit_z_com__sell_in_Bi2c - margin in NIS: ');

    //   var re  = price_dobel_quantity(buy__BTG__in_BI2C_sell_in_BIT_Z_COM,bit2c_co_il_BTG_NIS_order_book.asks[i][1]);

    //    print_in_NIS( re , bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c ,
    //         'buy__BTG__in_BI2C_sell_in_BIT_Z_COM - in NIS: ');

    if (buy__BTG__in_Bit_z_com__sell_in_Bi2c_margin > 0) {
      total_quantity_BTG = total_quantity_BTG +
          bit2c_co_il_BTG_NIS_order_book.asks[i][1];
      console.log('the total quantity in BTG is: '.info, total_quantity_BTG);

      if ((total_quantity_BTG *
              bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c) >=
          quantity_trade_limit_in_NIS) {

        console.log('the total quantity in BTG - is over the limit...'.red);
        console.log('sum : '.info);
        var total_quantity_of_BTG_show_in_NIS = (total_quantity_BTG -
            bit2c_co_il_BTG_NIS_order_book.asks[i][1]) *
            bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c;

        console.log('we need to invest (NIS) :  '.info,
            total_quantity_of_BTG_show_in_NIS);
        var total_profit_in_NIS = print_BTC_in_NIS(total_margin_in_BTC,
            bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c,
            'total_profit (sum all margin ) - in NIS: ');

        var bit2c_withdraw_fee_in_NIS = 0.0001 *
            bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c;

        DEBUG && console.log('withdraw fee in of 0.0001 BTG in nis '.info,
            bit2c_withdraw_fee);
        var total_profit_in_NIS_after_withdraw = ( total_profit_in_NIS -
            bit2c_withdraw_fee_in_NIS );

        console.log('total_profit_in_NIS_after_withdraw'.info,
            total_profit_in_NIS_after_withdraw);

        throw BreakException;
      }

      print_BTC_in_NIS(total_quantity_BTG,
          bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c,
          'total_quantity ( sum all quantity that we need to buy )  - in NIS: ');
      //console.log('total amount to buy BTG : ' , total_amount  );

      // DEBUG && console.log('total_margin_in_BTC'.red , typeof total_margin_in_BTC );
      //  DEBUG && console.log('margin_in_BTC'.red , typeof margin_in_BTC  );
      total_margin_in_BTC = total_margin_in_BTC + margin_in_BTC;
      DEBUG && console.log('total_margin_in_BTC'.red, total_margin_in_BTC);
      print_BTC_in_NIS(total_margin_in_BTC,
          bi2c_sorted.haighest_price_to_buy_BTG___in_bi2c,
          'total_profit (sum all margin ) - in NIS: '.yellow);

    } else {
      console.log('ok, this is minus margin - we queit ');
      throw BreakException;
    }

  });
} catch (e) {
  if (e !== BreakException) throw e;
};