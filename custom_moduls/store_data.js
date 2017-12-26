
module.exports = function (params_of_examine_to_store) {
  DEBUG && console.log('we are in store_data.js'.info);

  function send_examine(callback) {

    DEBUG && console.log('we are in send_examine');
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
      DEBUG && console.log('we have results');
      DEBUG && console.log(da);
      callback(null, da);
    }).catch(function(err) {
      // DEBUG && console.log('API call failed...');
      // API call failed...
    });
  };send_examine();
};