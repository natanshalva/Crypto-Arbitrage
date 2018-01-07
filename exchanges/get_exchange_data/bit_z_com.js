module.exports = function get_data(callback , coins) {
  DEBUG && console.log('we are in get_data - bit_z_com.js');

  var rp = require('request-promise');
  var options = {
    //  uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
    uri: 'https://www.bit-z.com/api_v1/depth?coin='+coins, qs: {
      //   access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    }, headers: {
      'User-Agent': 'Request-Promise',
    }, json: true // Automatically parses the JSON string in the response
  };

  rp(options).then(function(da) {
   //    console.log('da',da);
    callback(null, da);
  // return da;
  }).catch(function(err) {
    // API call failed...
   //  console.log('API call failed...');
  });

};
