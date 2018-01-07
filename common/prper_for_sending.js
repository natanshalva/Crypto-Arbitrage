module.exports = function prepare(coin_name,pair_coin, buy_form, sell_in, price_margin, helper_functions ) {
  DEBUG && console.log('we are in prepare_for_sending');

  var quantity_available_for_trade_value = helper_functions.quantity_available_for_trade( sell_in.sell_quantity, buy_form.buy_quantity);

  DEBUG && console.log('quantity_available_for_trade_value: '.info ,quantity_available_for_trade_value);

/*  var margin_in_NIS = print_margin_in_NIS(
      buy_in_Bit_z_com__sell_in_Bi2c_price_margin,
      quantity_available_for_trade_value,
      'buy_in_Bit_z_com__sell_in_Bi2c - margin in NIS: ');*/

  var margin_in_the_same_coin_value = helper_functions.margin_in_the_same_coin( price_margin, quantity_available_for_trade_value);

  DEBUG && console.log('margin_in_the_same_coin_value: '.info ,margin_in_the_same_coin_value);
  
  var params_of_examine_to_store = {
    coin: coin_name,
    pair_coin: pair_coin,

    buy_form: buy_form,
    sell_in: sell_in,

    quantity: quantity_available_for_trade_value,
    profit: margin_in_the_same_coin_value,
    profit_in_percentage: (Nomber(quantity_available_for_trade_value) / Nomber(margin_in_the_same_coin_value)),
  };
  
DEBUG && console.log('params_of_examine_to_store: info '.info, params_of_examine_to_store);
  return params_of_examine_to_store;
//------------------------------------------------------------------------------------
//      buy_form:  Bit2c.co.il -> sell in Bit-z.com
//------------------------------------------------------------------------------------
/*
  var quantity_available_for_trade_value_other_why = quantity_available_for_trade(
      bit_z_com_sorted.sell_quantity, bi2c_sorted.buy_quantity);
  var margin_in_the_same_coin_value_other_why = margin_in_the_same_coin(
      buy_in_BI2C_sell_in_BIT_Z_COM,
      quantity_available_for_trade_value_other_why);

  var params_of_examine_to_store = {
    coin: coin_name,
    pair_coin: pair_coin,
    buy_form: 'bit2c.co.il',
    buy_form_sorted: bi2c_sorted,

    sell_in: 'Bit-z.com',
    sell_in_sorted: bit_z_com_sorted,
    quantity: quantity_available_for_trade_value_other_why,
    profit: margin_in_the_same_coin_value_other_why,
  };

  DEBUG && console.log('params_of_examine_to_store: '.red, params_of_examine_to_store);
  require('./store_data.js')(params_of_examine_to_store, STORE_NEGATIVE_RESOLES);*/

};
