// bit-z.com
//  https://www.bit-z.com/about/fee
// https://www.bit-z.com/api.html
// the price - less the trade fee - and less Withdrawal fee

module.exports = function bit_z_com_sorted(bit_z_com_depth, coin,
                                           action_i,normalize_Bit_z_com) {
  DEBUG && console.log('in bit_z_com_sorted'.info);
  var Big = require('big.js');
  // ------------------------------------------------
  //    fees
  // ------------------------------------------------
  var buy_trad_fee = 1.001 ; // 0.1%
  var buy_withdraw_fee = 1.005 ; // 0.5%

  var sell_trad_fee = 0.999 ; // 0.1%
  var sell_withdraw_fee = 0.995 ; // 0.5%


  var bit_z_com_sorted = {
    u_can_sell_in_Bit_z_com: null,
    u_can_buy_in_Bit_z_com: null,
    buy_quantity: null,
    sell_quantity: null
  };

  //--------------------------------------------------------
  //              quantity
  //--------------------------------------------------------
  bit_z_com_sorted.buy_quantity = parseFloat(bit_z_com_depth.data.asks[action_i][1]);
  bit_z_com_sorted.sell_quantity = parseFloat(bit_z_com_depth.data.bids[action_i][1]);

/*  function normalize_Bit_z_com(coin_value, coin_fee, bit2c_co_il_NIS_BTC) {

  }
  */

 // bit_z_com_sorted.u_can_sell_in_Bit_z_com = (bit_z_com_depth.data.bids[action_i][0] * 0.999) * 0.995;

  // price
  // buy
  // 10 + 0.01% = 10.01 -> withdraw:  10.01  +  0.05% = total price to buy BTG in bit-z.com
  bit_z_com_sorted.u_can_buy_in_Bit_z_com = normalize_Bit_z_com(
      bit_z_com_depth.data.asks[action_i][0] ,
      buy_trad_fee ,
      buy_withdraw_fee
  );

  // sell
  // 10 - 0.01% = 99.99 -> withdraw: 99.99 - 0.05% = total price to sell BTG in bit-z.com
  bit_z_com_sorted.u_can_sell_in_Bit_z_com = normalize_Bit_z_com(
      bit_z_com_depth.data.bids[action_i][0],
      sell_trad_fee,
      sell_withdraw_fee
  );


  //DEBUG && console.log('u_can_buy_in_Bit_z_com'.info, u_can_buy_in_Bit_z_com);
  DEBUG && console.log('bit_z_com_sorted: '.info , bit_z_com_sorted);
  return bit_z_com_sorted ;
};