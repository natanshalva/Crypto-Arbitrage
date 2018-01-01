module.exports = module.exports = function(Big, colour) {

  return function standard_normalized_full_cycle(
      coin_value,
      trade_fee,
      withdraw_fee
  ) {
    // http://mikemcl.github.io/big.js/

    // sell BTG -> BTC  = 0.01%
    //  withdraw fee : 0.05% ( for BTC and for BTG )

    //  var trad_fee = 0.999 ;
    //  var withdraw_fee = 0.995 ;

    DEBUG && console.log('in standard_normalized_full_cycle'.info);

    var b_coin_value = new Big(coin_value);
    DEBUG && console.log('b_coin_value: '.info, parseFloat(b_coin_value));

    var b_trade_fee = new Big(trade_fee);
    DEBUG && console.log('b_trade_fee: '.info, parseFloat(b_trade_fee));

    var b_withdraw_fee = new Big(withdraw_fee);
    DEBUG && console.log('b_withdraw_fee : '.info, parseFloat(b_withdraw_fee));

    // ---////////////////////////////////////////

    var after_trade_fee = b_coin_value.times(b_trade_fee); // trade fee
    DEBUG && console.log('after_trade_fee: '.info, parseFloat(after_trade_fee));

/*    if(withdraw_fee_type === 'amount'){
      var after_withdraw_fee = after_trade_fee.minus(b_withdraw_fee); // withdraw
    }else{
      // percentage*/
      var after_withdraw_fee = after_trade_fee.times(b_withdraw_fee); // withdraw
   // }

    DEBUG && console.log('after_withdraw_fee: '.info, parseFloat(after_withdraw_fee));

    var re = parseFloat(after_withdraw_fee);

    DEBUG && console.log('(calculte the coin * fee ) * withdraw_fee : '.info, re);
    return re;
  };
};