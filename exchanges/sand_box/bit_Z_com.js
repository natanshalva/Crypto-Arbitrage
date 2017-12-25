console.log('Arber is runing ... test file');

// var bit2c = require('bit2c');

var rp = require('request-promise');

var options = {
   uri: 'https://www.bit-z.com/api_v1/ticker?coin=btc_usdt',
  //uri: 'https://www.bit-z.com/api_v1/tickerall',
  qs: {
    access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
  },
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true // Automatically parses the JSON string in the response
};

rp(options).then(function(da) {
   // console.log('dddd');
   console.log(da);
 // callback(null, da);
}).catch(function(err) {
  // API call faile
});

