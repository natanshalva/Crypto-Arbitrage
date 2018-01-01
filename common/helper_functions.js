

module.exports  = function (Big,colour) {


  var re  = {
    start: function(i) {
      DEBUG && console.log(' ');
      DEBUG && console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
      DEBUG && console.log('                 start scale                            '.red);
      DEBUG && console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
      console.log('                                                         '.info);
      DEBUG && console.log('i:'.info, i);
    },
    end_of_cycle: function(path, counting_rounds) {
      var counting_rounds_plus_one = counting_rounds + 1 ;
      DEBUG && console.log('  ');
      console.log('done... '+path.basename(__filename) +' ('+ counting_rounds_plus_one+')' );
      DEBUG && console.log('  ');
      return counting_rounds_plus_one ;
    },
    loop_function: function(run_in_loop_wrapper,delay_in_milliseconds) {
      if(DEBUG === false ){

        var delay = delay_in_milliseconds ;
        setTimeout(run_in_loop_wrapper, delay );
      }
    },
    quantity_available_for_trade:  function quantity_available_for_trade(quantity_for_sell,
      quantity_available) {
    DEBUG && console.log('we are in: quantity_available_for_trade '.info);
    DEBUG && console.log('quantity_available: '.info, quantity_available);
    if (quantity_for_sell < quantity_available) {
      quantity = quantity_for_sell;
    } else {
      quantity = quantity_available;
    }
    return quantity;
  },

    price_times_quantity: function price_times_quantity(margin, quantity) {
    DEBUG && console.log('      ');
    DEBUG && console.log('we are in price_times_quantity');
    DEBUG && console.log('margin'.info, margin);
    // DEBUG && console.log('type of... margin'.info, typeof margin);
    DEBUG && console.log('quantity '.info, quantity);
    // DEBUG && console.log('type of...quantity '.info, typeof quantity);
    var price_times_quantity_return_value = margin * quantity;

    DEBUG && console.log('type of... '.info, typeof price_times_quantity_return_value);
    DEBUG && console.log('price_times_quantity'.info, price_times_quantity_return_value);
    return price_times_quantity_return_value;
  },

  margin_in_the_same_coin:  function margin_in_the_same_coin(margin,
      quantity) {
      DEBUG && console.log('we are in margin_in_the_same_coin'.info);
  //  var gg = Big(margin) * Big(quantity); // e.price_times_quantity(margin, quantity);
    var gg =   re.price_times_quantity(margin, quantity);
    DEBUG && console.log('we return ->gg:  ', gg);
    var x = new Big(gg);
    var dd = x.times(quantity).toFixed(8);
    
    DEBUG && console.log('we return ->margin_in_the_same_coin:  '.info , dd );
    // this must reten a string
    return dd;
  },
    standard_normalized_full_cycle:  function standard_normalized_full_cycle(coin_value, trade_fee, withdraw_fee ) {
    // http://mikemcl.github.io/big.js/

    // sell BTG -> BTC  = 0.01%
    //  withdraw fee : 0.05% ( for BTC and for BTG )

    //  var trad_fee = 0.999 ;
    //  var withdraw_fee = 0.995 ;


    DEBUG && console.log('in standard_normalized_full_cycle'.info );

    var b_coin_value = new Big(coin_value);
    DEBUG && console.log('b_coin_value: '.info ,parseFloat(b_coin_value ));

    var b_trade_fee = new Big(trade_fee);
    DEBUG && console.log('b_trade_fee: '.info ,parseFloat(b_trade_fee ));

    var b_withdraw_fee = new Big(withdraw_fee);
    DEBUG && console.log('b_withdraw_fee : '.info ,parseFloat(b_withdraw_fee ));

    // ---////////////////////////////////////////

    var after_trade_fee = b_coin_value.times(b_trade_fee) ; // trade fee
    DEBUG && console.log('after_trade_fee: '.info ,parseFloat(after_trade_fee));

    var after_withdraw_fee = after_trade_fee.times(b_withdraw_fee); // withdraw
    DEBUG && console.log('after_withdraw_fee: '.info ,parseFloat(after_withdraw_fee));

    var re =  parseFloat(after_withdraw_fee);

    DEBUG && console.log('(calculte the coin * fee ) * withdraw_fee : '.info,re);
    return re  ;
  }
};

  return re;

};
