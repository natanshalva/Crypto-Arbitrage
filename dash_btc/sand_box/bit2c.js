var bit2c = require('sand_box/bit2c');

// https://www.bit2c.co.il/home/api
bit2c.getOrderBook('BtgNis', function(error, getOrderBook) {
   console.log(getOrderBook.asks[0][0]);
});