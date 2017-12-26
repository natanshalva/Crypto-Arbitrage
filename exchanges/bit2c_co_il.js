
/*var gg =  function() {
var bit2c = require('bit2c');*/

  module.exports  =  function execute_bi2c_sort(
                          bit2c_co_il_NIS_BTC,
                          bit2c_co_il_BTG_NIS_order_book,
                          coin,
                          action_i) {
    DEBUG && console.log('in execute_bi2c_sort:'.info, coin);

    var bi2c_sort = {
      lowest_sell_BTG__in_NIS: null,
      haighest_buy_BTG___in_NIS: null,
      u_can_buy_BTG_in_BI2C_for_BTC: null,
      u_can_sell_BTG__in_bi2c_for_BTC: null,
      buy_quantity: null,
      sell_quantity: null,
      BTC_NIS: null
    };

    bi2c_sort.BTC_NIS = bit2c_co_il_NIS_BTC.h ;
    bi2c_sort.buy_quantity =  bit2c_co_il_BTG_NIS_order_book.asks[action_i][1] ;
    bi2c_sort.sell_quantity = bit2c_co_il_BTG_NIS_order_book.bids[action_i][1] ;

    bi2c_sort.lowest_sell_BTG__in_NIS = bit2c_co_il_BTG_NIS_order_book.asks[action_i][0];
    bi2c_sort.haighest_buy_BTG___in_NIS = bit2c_co_il_BTG_NIS_order_book.bids[action_i][0] ;

    // SELL BTC - to NIS
    // BUY BTG - with nis

    function normalize_Bi2c(coin_value, coin_fee, bit2c_co_il_NIS_BTC) {
      var re =  ((coin_value * coin_fee) / bit2c_co_il_NIS_BTC.h  ) ;
      DEBUG && console.log('calculte the coin * fee / bitcoin price in NIS'.info, re );
      return re ;
    }

    bi2c_sort.u_can_buy_BTG_in_BI2C_for_BTC = normalize_Bi2c(
        bit2c_co_il_BTG_NIS_order_book.asks[action_i][0],
        1.005,
        bit2c_co_il_NIS_BTC
    );
    //  DEBUG && console.log('u_can_buy_BTG_in_BI2C_for_BTC',bi2c_sorted.u_can_buy_BTG_in_BI2C_for_BTC);

    bi2c_sort.u_can_sell_BTG__in_bi2c_for_BTC = normalize_Bi2c(
        bit2c_co_il_BTG_NIS_order_book.bids[action_i][0],
         0.995, // 0.5%
        bit2c_co_il_NIS_BTC,
        0.995 // 0.5%
    );
    //  console.log( 'u_can_sell_BTG__in_bi2c_for_BTC ',bi2c_sorted.u_can_sell_BTG__in_bi2c_for_BTC ) ;




    DEBUG && console.log('bi2c_sorted_in_function'.info, bi2c_sort);
    return bi2c_sort;
  };
