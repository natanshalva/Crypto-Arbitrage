// bit-z.com
//  https://www.bit-z.com/about/fee
// https://www.bit-z.com/api.html
// the price - less the trade fee - and less Withdrawal fee

module.exports = function abucoins_sorted( order_book, coin,
                                           action_i,standard_normalized_full_cycle) {
  DEBUG && console.log('in abucoins_sorted'.info);
  var Big = require('big.js');
  // ------------------------------------------------
  //    fees
  // ------------------------------------------------
  var buy_trad_fee = 1.001 ; // 0.1%
  var buy_withdraw_fee = 1.005 ; // 0.5%

  var sell_trad_fee = 0.999 ; // 0.1%
  var sell_withdraw_fee = 0.995 ; // 0.5%


  var abucions_sorted = {
    u_can_sell: null,
    u_can_buy: null,
    buy_quantity: null,
    sell_quantity: null
  };

  //--------------------------------------------------------
  //              quantity
  //--------------------------------------------------------
  abucions_sorted.buy_quantity = parseFloat(order_book.data.asks[action_i][1]);
  abucions_sorted.sell_quantity = parseFloat(order_book.data.bids[action_i][1]);

/*  function normalize_Bit_z_com(coin_value, coin_fee, bit2c_co_il_NIS_BTC) {

  }
  */

 // bit_z_com_sorted.u_can_sell_in_Bit_z_com = (bit_z_com_depth.data.bids[action_i][0] * 0.999) * 0.995;

  // price
  // buy
  // 10 + 0.01% = 10.01 -> withdraw:  10.01  +  0.05% = total price to buy BTG in bit-z.com
  abucions_sorted.u_can_buy = standard_normalized_full_cycle(
      order_book.asks[action_i][0] ,
      buy_trad_fee ,
      buy_withdraw_fee
  );

  // sell
  // 10 - 0.01% = 99.99 -> withdraw: 99.99 - 0.05% = total price to sell BTG in bit-z.com
  abucions_sorted.u_can_sell = standard_normalized_full_cycle(
      order_book.bids[action_i][0],
      sell_trad_fee,
      sell_withdraw_fee
  );


  DEBUG && console.log('order_book: '.info , abucions_sorted);
  return abucions_sorted ;
};