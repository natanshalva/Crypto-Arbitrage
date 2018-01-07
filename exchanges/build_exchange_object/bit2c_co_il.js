
/*var gg =  function() {
var bit2c = require('bit2c');*/

// var Big = require('big.js');
module.exports  =  function execute_bi2c_sort(
                          bit2c_co_il_NIS_BTC,
                          bit2c_co_il_order_book,
                          coin,
                          action_i,
    normalize_Bi2c
    ) {

    DEBUG && console.log('in execute_bi2c_sort:'.info, coin);

  // ------------------------------------------------
  //    fees
  //  https://www.bit2c.co.il/home/Fees
  // ------------------------------------------------

  var buy_trad_fee = 1.005 ; // 0.05%
//  var buy_withdraw_fee = 1.005 ; // 0.05%

  var sell_trad_fee = 0.995 ; // 0.05%
 // var sell_withdraw_fee = 0.995 ; // 0.05%

    var bi2c_sort = {
      exchange_site: 'bit2c.co.il',
      lowest_sell__in_NIS: null,
      haighest_buy__in_NIS: null,
      u_can_buy_in_BI2C_for_BTC: null,
      u_can_sell_in_bi2c_for_BTC: null,
      buy_quantity: null,
      sell_quantity: null,
      BTC_NIS: null
    };

    bi2c_sort.BTC_NIS = bit2c_co_il_NIS_BTC.h ;

  //--------------------------------------------------------
  //              quantity
  //--------------------------------------------------------
    bi2c_sort.buy_quantity =  bit2c_co_il_order_book.asks[action_i][1] ;
    bi2c_sort.sell_quantity = bit2c_co_il_order_book.bids[action_i][1] ;

  //--------------------------------------------------------
  //              price
  //--------------------------------------------------------

    bi2c_sort.lowest_sell__in_NIS = bit2c_co_il_order_book.asks[action_i][0];
    bi2c_sort.haighest_buy__in_NIS = bit2c_co_il_order_book.bids[action_i][0] ;

    // SELL BTC - to NIS
    // BUY BTG - with nis

    bi2c_sort.u_can_buy_in_BI2C_for_BTC = normalize_Bi2c(
        bit2c_co_il_order_book.asks[action_i][0],
        buy_trad_fee,
        bit2c_co_il_NIS_BTC
    );
    //  DEBUG && console.log('u_can_buy_in_BI2C_for_BTC',bi2c_sorted.u_can_buy_in_BI2C_for_BTC);

    bi2c_sort.u_can_sell_in_bi2c_for_BTC = normalize_Bi2c(
        bit2c_co_il_order_book.bids[action_i][0],
         sell_trad_fee,
        bit2c_co_il_NIS_BTC
    );
    //  console.log( 'u_can_sell_in_bi2c_for_BTC ',bi2c_sorted.u_can_sell_in_bi2c_for_BTC ) ;

    DEBUG && console.log('bi2c_sorted_in_function'.info, bi2c_sort);
    return bi2c_sort;
  };
