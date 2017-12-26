// bit-z.com
//  https://www.bit-z.com/about/fee
// https://www.bit-z.com/api.html
// the price - less the trade fee - and less Withdrawal fee

module.exports = function bit_z_com_sorted(bit_z_com_BTG_BTC_depth, coin,
                                           action_i) {
  DEBUG && console.log('in bit_z_com_sorted'.info);

  var bit_z_com_sorted = {
    u_can_sell_BTG_in_Bit_z_com: null,
    u_can_buy_BTG_in_Bit_z_com: null,
    buy_quantity: null,
    sell_quantity: null
  };


  bit_z_com_sorted.buy_quantity = parseFloat(bit_z_com_BTG_BTC_depth.data.asks[action_i][1]);
  bit_z_com_sorted.sell_quantity = parseFloat(bit_z_com_BTG_BTC_depth.data.bids[action_i][1]);

  bit_z_com_sorted.u_can_sell_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC_depth.data.bids[action_i][0] * 0.999) * 0.995;
  // DEBUG && console.log('u_can_sell_BTG_in_Bit_z_com'.info, bit_z_com_sorted);
 // DEBUG && console.log('bit_z_com_BTG_BTC_depth.data.asks',bit_z_com_BTG_BTC_depth.data.asks);

  //var sss = bit_z_com_BTG_BTC_depth.data.asks ;
 //  var gg = sss.reverse();
//   DEBUG && console.log('asks after sort',gg);
 // DEBUG && console.log('bit_z_com_BTG_BTC_depth.data.asks[action_i][0]', bit_z_com_BTG_BTC_depth.data.asks[action_i][0]);
  bit_z_com_sorted.u_can_buy_BTG_in_Bit_z_com = (bit_z_com_BTG_BTC_depth.data.asks[action_i][0] * 1.001) * 1.005;
  //DEBUG && console.log('u_can_buy_BTG_in_Bit_z_com'.info, u_can_buy_BTG_in_Bit_z_com);
  DEBUG && console.log('bit_z_com_sorted: '.info , bit_z_com_sorted);
  return bit_z_com_sorted ;
};