
module.exports = function(Big, colour) {
    return function normalize_Bi2c(coin_value, trade_fee, bit2c_co_il_NIS_BTC) {
      DEBUG && console.log(' '.info);
      DEBUG && console.log('in normalize_Bi2c'.red);
      // http://mikemcl.github.io/big.js/

      // trade
      // sell BTG -> NIS  = 0.05%

      // withdraw
      // Buy NIS -> BTG  = 0.05%
      // add - withdrow fee : BTG 0.0001
      // add - buy BTC in Bit-z fee  : 0.999

      // convert to Big
      var b_coin_value = new Big(coin_value);
      DEBUG && console.log('coin_value: '.info, parseFloat(b_coin_value));

      var b_trade_fee = new Big(trade_fee);
      DEBUG && console.log('b_trade_fee: '.info, parseFloat(b_trade_fee));

      var b_bitcoin_price = new Big(bit2c_co_il_NIS_BTC.h);
      DEBUG && console.log('b_bitcoin_price: '.info, parseFloat(b_bitcoin_price));

      var b_buy_Other_coin_fee = new Big(0.995);
      DEBUG && console.log('b_buy_Other_coin_fee: '.info,
          parseFloat(b_buy_Other_coin_fee));

      var b_BTG_withdraw_fee = new Big(0.0001);
      DEBUG &&
      console.log('b_BTG_withdraw_fee : '.info, parseFloat(b_BTG_withdraw_fee));

      var b_withdraw_fee_in_BTC = ( b_BTG_withdraw_fee * b_coin_value) /
          b_bitcoin_price; // withdrow fee : BTG 0.0001
      DEBUG && console.log('b_withdraw_fee_in_BTC: '.info,
          parseFloat(b_withdraw_fee_in_BTC));

      var b_buy_BTC_in_Bit_z_com = new Big(0.999);
      DEBUG && console.log('b_buy_BTC_in_Bit_z_com: '.info,
          parseFloat(b_buy_BTC_in_Bit_z_com));
      // ----------------------------------------------------------------
      // start calculation
      // ----------------------------------------------------------------

      var coin_value_after_trade_fee = b_coin_value.times(b_trade_fee); //sell/buy  coin * fee
      DEBUG && console.log('coin_value_after_trade_fee sell/buy  coin * fee: '.info,
          parseFloat(coin_value_after_trade_fee));

      var value_in_BTC = coin_value_after_trade_fee.div(b_bitcoin_price); // NIS / bitcoin price
      DEBUG && console.log('value_in_BTC = NIS / bitcoin price: '.info, parseFloat(value_in_BTC));

      var value_after_buy_other_coin = value_in_BTC.times(b_buy_Other_coin_fee); // buy Other coin to transfer the money out the exchange
      DEBUG && console.log('buy Other coin to transfer the money out the exchange: '.info,
          parseFloat(value_after_buy_other_coin));

      var value_minus_withdraw_fee = value_after_buy_other_coin.minus(
          b_withdraw_fee_in_BTC); // withdraw fee
      //  var value_minus_withdraw_fee = value_after_buy_other_coin; // withdraw fee
      DEBUG &&
      console.log('withdraw fee: '.info, parseFloat(value_minus_withdraw_fee));

      var b = value_minus_withdraw_fee.times(b_buy_BTC_in_Bit_z_com);//  add - buy BTC in Bit-z.com fee  : 0.999
      DEBUG &&
      console.log('after withdarw - buy BTC in Bit-z.com fee  : 0.999: '.info,
          (value_minus_withdraw_fee).toFixed(8));

      // transfer Other coin fee not included ~ 0.0001 ;

      var re = parseFloat(b);

      DEBUG &&
      console.log('calculte the coin * fee / bitcoin price in NIS: '.info, re);
      return re;
    };
  };
