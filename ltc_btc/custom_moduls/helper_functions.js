

module.exports  = function (Big,colour) {


  var re  = {
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
  }
};

  return re;

};
