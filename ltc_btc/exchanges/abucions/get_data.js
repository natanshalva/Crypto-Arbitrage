console.log('ssss');

// var bit2c = require('bit2c');
/*
var rp = require('request-promise');

var options = {
  uri: 'https://www.bit-z.com/ /products/BTC-PLN/book?level=2',
  // uri: 'https://www.bit-z.com/api_v1/depth?coin=btg_btc',
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
  console.log(da);
  //  console.log('dddd');
  var sss = da.data.asks;
  //  console.log('sss: ', sss);
//  var eeee = sss.reverse();
//   console.log(eeee);
  // callback(null, da);
}).catch(function(err) {
  // API call faile
});*/

  function wrap  () {

  const rp = require('request-promise');
  const crypto = require('crypto');

  const TIMEOUT = 5000;

  class Abucoins {
    constructor() {
      this.endpoint = 'https://api.abucoins.com';
      this.credentials = {
        key: '10513875-XZAEVTFUOK87G6192P3NYMDWSB05CHRJ',
        secret: 'LzRSRE13SnJXcCV0SV0xS0YpfTc9NXghWUIwKkUiPnw2PzwsT2BffkAmaFU5UUNn',
        passphrase: 'ij5tgkjdb',
      }
    }

    _jsonRequest(options) {
      options.timeout = TIMEOUT;
      options.json = true;

      return rp(options);
    }

    _getHeaders(sign, timestamp) {
      return {
        'AC-ACCESS-KEY': this.credentials.key,
        'AC-ACCESS-SIGN': sign,
        'AC-ACCESS-TIMESTAMP': timestamp,
        'AC-ACCESS-PASSPHRASE': this.credentials.passphrase,
      };
    }

    signAndRequest(method, path, body = {}) {
      const timestamp = Math.floor(new Date() / 1000);
      let options = {
        uri: `${this.endpoint}${path}`, method: method, body: body,
      };
      let string = timestamp + method + path;
      if (Object.keys(body).length > 0) {
        string += JSON.stringify(body);
      }
      const sign = crypto.createHmac('sha256',
          Buffer.from(this.credentials.secret, 'base64')).
          update(string).
          digest('base64');
      options.headers = this._getHeaders(sign, timestamp);

      return this._jsonRequest(options);
    }
  }

  let abucoins = new Abucoins();
  let orders = abucoins.signAndRequest('GET', `/products/LTC-BTC/book?level=1`);

  orders.then((list) => {
    console.log(list);

  });

};
wrap();