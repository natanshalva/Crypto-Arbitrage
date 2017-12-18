console.log('Arber is runing ...');

var prettyjson = require('prettyjson');

var request = require('request');
var url = 'https://www.bit-z.com/api_v1/ticker?coin=btx_btc';
request(url, function (error, response, body) {
 // console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 // console.log('body:',prettyjson.render(body,options) ); // Print the HTML for the Google homepage.

  const object = JSON.parse(body);
  const util = require('util');

  var niceBody = util.inspect(object, {depth: null, colors: true});

  var data = {
    url: url,
    error: error,
    statusCode:  response && response.statusCode,
   body:  niceBody
  };

  var options = {
    noColor: false
  };


  console.log(prettyjson.render(data, options));


});