//-------------------------------------------------------------------
//  log
//----------------------------------------------------------------

module.exports  = function (Big,colour,log) {


  var re  = {
    start: function(i) {
      DEBUG && console.log(' ');
      DEBUG && console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
      DEBUG && console.log('                 start scale                            '.red);
      DEBUG && console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'.info);
      console.log('                                                         '.info);
      DEBUG && console.log('i:'.info, i);
    },
    end_of_cycle: function(coin, pair_coin, path, counting_rounds) {
      DEBUG && console.log('we are in end_of_cycle');
      var counting_rounds_plus_one = counting_rounds + 1 ;
      DEBUG && console.log('  ');
      var str = 'done... '+coin+'-'+pair_coin+' '+path ;

      console.log(str.info +' ('+ counting_rounds_plus_one+')' );
      DEBUG && console.log('  ');
     // log.info(str);
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
    var price_times_quantity_return_value = parseFloat(margin) * parseFloat(quantity);

    DEBUG && console.log('type of... '.info, typeof price_times_quantity_return_value);
    DEBUG && console.log('price_times_quantity'.info, price_times_quantity_return_value);

    var fix_price_times_quantity_return_value = parseFloat(price_times_quantity_return_value).toFixed(8);
    DEBUG && console.log('fix_price_times_quantity_return_value'.info, fix_price_times_quantity_return_value);
    return fix_price_times_quantity_return_value;
  },

  margin_in_the_same_coin:  function margin_in_the_same_coin(margin, quantity) {
      DEBUG && console.log('we are in margin_in_the_same_coin'.green);

      var margin_fix = parseFloat(margin).toFixed(8);
      var quantity_fix = parseFloat(quantity).toFixed(8);

      DEBUG && console.log('margin: '.info, margin_fix);
      DEBUG && console.log('quantity: '.info, quantity_fix);
  //  var gg = Big(margin) * Big(quantity); // e.price_times_quantity(margin, quantity);
    var gg =   re.price_times_quantity(margin_fix, quantity_fix);
   // DEBUG && console.log('we return:  '.info , gg);
    var x = new Big(gg);
    var dd = x.times(quantity).toFixed(8);
    
    DEBUG && console.log('we return - margin_in_the_same_coin:  '.info , dd );
    // this must reten a string
    return dd;
  }

};

  return re;

};
