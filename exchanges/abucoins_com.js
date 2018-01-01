// bit-z.com
//  https://www.bit-z.com/about/fee
// https://www.bit-z.com/api.html
// the price - less the trade fee - and less Withdrawal fee

module.exports = function abucoins_sorted(
    action_i,
     coin,
    pair_coin,
    order_book,
    standard_normalized ) {

  DEBUG && console.log('in abucoins_sorted'.info);

  // ------------------------------------------------
  //    fees
  //
  // https://abucoins.com/fees/deposit-withdrawals
  // ------------------------------------------------
  //

  var sell_trad_fee = 0.999 ; // 0.1%
   var buy_withdraw_fee = 0.999 ; // 0.1%

  var buy_trad_fee = 1.001 ; // 0.1%

  var sell_withdraw_fee = 0.999 ;


 /* if(coin === 'LTC' && pair_coin == 'BTC' ){
    var buy_withdraw_fee = 0.001 ; // in LTC - becouse we buy LTC and  withdraw LTC
    var buy_withdraw_type =  'amount'  ;  // percentage

    // withdraw BTC
    var sell_withdraw_fee = 0.001 ; // in BTC - becouse we sell LTC and withdraw BTC
    var sell_withdraw_type = 'amount' ; //
  }*/



  //  var buy_withdraw_fee = 1.005 ; // 0.5%



  var abucions_sorted = {
    exchange_site: 'abucoins.com',
    u_can_sell: null,
    u_can_buy: null,
    buy_quantity: null,
    sell_quantity: null
  };

  // DEBUG && console.log('asdf');
  //--------------------------------------------------------
  //              quantity
  //--------------------------------------------------------
  abucions_sorted.buy_quantity = parseFloat(order_book.asks[action_i][1]).toFixed(8);
  abucions_sorted.sell_quantity = parseFloat(order_book.bids[action_i][1]).toFixed(8);



  // bit_z_com_sorted.u_can_sell_in_Bit_z_com = (bit_z_com_depth.data.bids[action_i][0] * 0.999) * 0.995;

  // price
  // buy
  // 10 + 0.01% = 10.01 -> withdraw:  10.01  +  0.05% = total price to buy BTG in bit-z.com
  abucions_sorted.u_can_buy = standard_normalized(
      order_book.asks[action_i][0] ,
      buy_trad_fee ,
      buy_withdraw_fee
  );

 // sell
  abucions_sorted.u_can_sell = standard_normalized(
      order_book.bids[action_i][0],
      sell_trad_fee,
      sell_withdraw_fee
  );


  DEBUG && console.log(' order_book : '.info , abucions_sorted);
  return abucions_sorted ;
};