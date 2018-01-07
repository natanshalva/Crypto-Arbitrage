var Big = require('./');
DEBUG = true;
DEBUG && console.log('in normalize_Bi2c'.info );
var b_coin_value = new Big(10);
DEBUG && console.log('coin_value'.info , b_coin_value );

var b_coin_fee = new Big(2);
var b_bitcoin_price = new Big(60000);
var b_buy_Other_coin_fee = new Big(0.995);

var t =  b_coin_value.times(b_coin_fee);
var h = t.div(b_bitcoin_price);
var j = h.times(b_buy_Other_coin_fee);
var kk = j.times(b_buy_Other_coin_fee);