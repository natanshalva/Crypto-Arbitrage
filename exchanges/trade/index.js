
module.exports  = function (params_of_examine_to_store) {
  DEBUG && console.log('we are in trade index.js'.red);
  function asdf () {
    DEBUG && console.log('params_of_examine_to_store.u_buy_form', params_of_examine_to_store.buy_form.exchange_site);
   // if(params_of_examine_to_store.profit_in_percentage > 1 ){
  //  if(true){
          // send to the  buy_form
     var exchange_file_name =  params_of_examine_to_store.buy_form.exchange_site.replace('.','_');
     var exchange_file_name_t =  exchange_file_name.replace('-','_');
      console.log('exchange_file_name',exchange_file_name_t);
        require('./'+exchange_file_name_t+'.js')(params_of_examine_to_store);
      //  require('./bit_z_com.js')(params_of_examine_to_store);
       // asdfsadf

   // }
  }
  asdf();
};