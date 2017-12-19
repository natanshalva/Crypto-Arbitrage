console.log('Arber is runing ...');
DEBUG = true;

var async = require('async');


// var bit_z_com = require('./exchanges/bit_z_com');
// DEBUG && console.log(bit_z_com);

// var bit2c_co_il = require('./exchanges/bit2c_co_il');
//DEBUG && console.log(bit2c_co_il);

async.parallel([
      function get__bit_z_com (callback) {
      /*   require('./exchanges/bit_z_com').then(function(foo){
          //Here code using foo;
           callback(foo);
        });*/

        var rp = require('request-promise');

        console.log('-------------------------------------------');
        console.log('-               bit-z.com                 -');
        console.log('-               btg_btc                   -');
        console.log('-------------------------------------------');

        var options = {
          uri: 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc',
          qs: {
            access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
          },
          headers: {
            'User-Agent': 'Request-Promise'
          },
          json: true // Automatically parses the JSON string in the response
        };
        rp(options).then(function(da) {
          //  DEBUG && console.log(da);
          callback(null,da);
        }).catch(function(err) {
          // API call failed...
        });

      },
      function(callback) {
        var bit2c = require('bit2c');
        bit2c.getTicker('BtgNis', function(error, ticker) {
          console.log('-------------------------------------------');
          console.log('-               BT2C      - Btg           -');
          console.log('-------------------------------------------');
          console.log(ticker);
          console.log('');
          //  return ticker;
          //   ticker.ll ;
          // console.log(' buy BTG price in nis:' , ticker.h );
          console.log(' buy BTG price in nis - after fee :' , ticker.h * 0.995   );
          callback(null,ticker);
          /*  bit2c.getTicker('BtcNis', function(error, bitcoin) {
              console.log(bitcoin);
              BUY__BTG__IN_BI2C = ( ticker.l * 0.995)  /  bitcoin.h;
              console.log( 'BUY__BTG__IN_BI2C',BUY__BTG__IN_BI2C ) ;
              SELL__BTG__IN_BI2C = ( ticker.h * 0.995)  /  bitcoin.h;
              console.log( 'SELL__BTG__IN_BI2C',SELL__BTG__IN_BI2C ) ;

              BUY__BTG__IN_BIT_Z_COM____SELL__BTG__IN_BI2C  = BUY__BTG__IN_BIT_Z_COM  - SELL__BTG__IN_BI2C;

              BUY__BTG__IN_BI2C__SELL__BTG__IN_BIT_Z_COM = BUY__BTG__IN_BI2C - SELL__BTG__IN_BIT_Z_COM ;

              var read_number_in_nis = parseFloat(BUY__BTG__IN_BI2C__SELL__BTG__IN_BIT_Z_COM * bitcoin.h).toFixed(2)  ;
              console.log( 'buy in bi2c and sell in bit-z.com - in NIS' ,  read_number_in_nis );

              console.log( 'buy in bit-z.com and sell in bit-z.com - in NIS' , BUY__BTG__IN_BIT_Z_COM____SELL__BTG__IN_BI2C * bitcoin.h);
            });*/

        });
      }
    ],
// optional callback
    function(err, results) {
      // the results array will equal ['one','two'] even though
      // the second function had a shorter timeout.
      DEBUG && console.log('results', results);
    });
