module.exports  = function (params_of_examine_to_store) {
  DEBUG && console.log('we are in buy form bit_z_com'.info);
  // https://www.bit-z.com/api.html
   function doit() {
     var rp = require('request-promise');

     //   api_key = 376892265asdad5d12726d8bbfbd8912b3 & timestamp = 1510235730 & nonce = 309127 &
     // type = in & price = 0.04751351 & number = 10 & coin = eth_btc & tradepwd = asdf

     // bc0ceaf6662697df4d7062c5358b3c63

     var data_to_send = {
        api_key: '14bfa3f1d07065d7c09bad849544632d',
        timestamp:
        nonce:
        type:
        price:
        number: 0.00000001,
        coin: 'ltc_btc',
        tradepwd: 'asdf'

   }

     var options = {
       method: 'POST',
       //  uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
       uri: 'https://www.bit-z.com/api_v1/depth?coin='+coins,

       qs: {
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
  }
  doit();
};