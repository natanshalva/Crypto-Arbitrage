
module.exports = function (params_of_examine_to_store, STORE_NEGATIVE_RESOLES) {
  DEBUG && console.log('we are in store_data.js'.info);

  function send_examine(callback) {
    DEBUG && console.log('we are in send_examine');

    if(params_of_examine_to_store.profit < 0.000001 ){
      if(STORE_NEGATIVE_RESOLES ){
        DEBUG && console.log('params_of_examine_to_store.profit - : '.info , params_of_examine_to_store.profit);
        DEBUG && console.log('STORE_NEGATIVE_RESOLES : '.info , STORE_NEGATIVE_RESOLES);
      }else {
        DEBUG && console.log('params_of_examine_to_store.profit - : '.info , params_of_examine_to_store.profit);
        DEBUG && console.log('STORE_NEGATIVE_RESOLES : '.info, STORE_NEGATIVE_RESOLES);
        return true;
      }
    }


    var rp = require('request-promise');
    var options = {
      method: 'POST',
      uri: 'http://manage_arber.local/Api/en/v1/examines',
      qs: params_of_examine_to_store,
      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    rp(options).then(function(da) {

      DEBUG && console.log('we have results: '.green , da);
      callback(null, da);
    }).catch(function(err) {
      // DEBUG && console.log('API call failed...');
      // API call failed...
    });
  };
  send_examine();
};