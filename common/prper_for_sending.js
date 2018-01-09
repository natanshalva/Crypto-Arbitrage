module.exports = function prepare(coin_name,pair_coin, buy_form, sell_in, price_margin, helper_functions) {
  DEBUG && console.log('we are in prepare_for_sending');

  var quantity_available_for_trade_value = helper_functions.quantity_available_for_trade( sell_in.sell_quantity, buy_form.buy_quantity);

  DEBUG && console.log('quantity_available_for_trade_value: '.info ,quantity_available_for_trade_value);

  var margin_in_the_same_coin_value = helper_functions.margin_in_the_same_coin( price_margin, quantity_available_for_trade_value);

  DEBUG && console.log('margin_in_the_same_coin_value: '.info ,margin_in_the_same_coin_value);
  
  var params_of_examine_to_store = {
    id: Math.round(new Date().getTime()/1000) + Math.random().toString(36).substr(2,5),
    coin: coin_name,
    pair_coin: pair_coin,


    buy_form: buy_form,
    sell_in: sell_in,

    quantity: quantity_available_for_trade_value,
    profit: margin_in_the_same_coin_value,
    profit_in_percentage: (  (Number(margin_in_the_same_coin_value) / Number(quantity_available_for_trade_value)) * 100 ).toFixed(2),
  };
  
DEBUG && console.log('params_of_examine_to_store:'.red , params_of_examine_to_store);
  return params_of_examine_to_store;

};
