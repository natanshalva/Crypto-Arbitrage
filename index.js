console.log('Arber is runing ...');

BUY__BTG__IN_BIT_Z_COM = null;

var prettyjson = require('prettyjson');

var request = require('request');

console.log('-------------------------------------------');
console.log('-               bit-z.com                 -');
console.log('-               btg_btc                   -');
console.log('-------------------------------------------');


var url = 'https://www.bit-z.com/api_v1/ticker?coin=btg_btc';

request(url, function (error, response, body) {
  const object = JSON.parse(body);
  const util = require('util');

  var niceBody = util.inspect(object, {depth: null, colors: true});

  var dataToPrint = {
    url: url,
    error: error,
    statusCode:  response && response.statusCode,
   body:  niceBody
  };

  var options = {
    noColor: false
  };
  //https://www.bit-z.com/about/fee
  // trade fee 0.1%
  //withdrow = 0.5%


  BUY__BTG__IN_BIT_Z_COM = (object.data.sell * 0.999 ) * 0.995 ;
  console.log(' buy BTG in bit-z.com price in BTC - after fee :' , BUY__BTG__IN_BIT_Z_COM   );
  SELL__BTG__IN_BIT_Z_COM = (object.data.buy * 0.999 ) * 0.995 ;
  console.log('SEll -  BTG in bit-z.com price in BTC - after fee :' , SELL__BTG__IN_BIT_Z_COM  );

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

    bit2c.getTicker('BtcNis', function(error, bitcoin) {
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
    });

  });
});


var bit2c = require('bit2c');

/*
bit2c.getOrderBook('BtgNis', function(error, ticker) {
    console.log('-------------------------------------------');
    console.log('-               BT2C      - Btg           -');
    console.log('-------------------------------------------');
    console.log(ticker);
    console.log('');
  //  return ticker;
  //  BUY__BTG__IN_BI2C =  ticker.ll ;
  // console.log(' buy BTG price in nis:' , ticker.h );
  //  console.log(' buy BTG price in nis - after fee :' , ticker.h * 0.995   );
  });
  */








/*

  credentials = {
    key: '4176aad7-abca-4d1d-b8cc-3f0285860c15',
    secret: '9DB3266F66425611A3A0BE622C07C1402D31753F7C5D27FCA2E5E30F4F7710FD'
  };

// getting your current balance
  bit2c.getBalance(credentials, function(error, balance) {
    console.log('-------------------------------------------');
    console.log('-               BT2C                      -');
    console.log('-------------------------------------------');
    console.log(balance);
  });*/

