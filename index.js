DEBUG = false;
var shell = require('shelljs');

var r = require('./common/all_require');

var helper_functions = require('./common/helper_functions.js')(r.Big, r.colour,
    r.log);

var childProcess = require('child_process');

function runScript(scriptPath, callback) {

  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;

  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', function(err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', function(code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error('exit code ' + code);
    callback(err);
  });

}

// Now we can run a script and invoke a callback when complete, e.g.
runScript('./coins/bch_btc/bit2c_co_il__bit_z_com.js', function(err) {
  if (err) throw err;
  console.log('finished running some-script.js');
});

var path = './coins/bch_btc/bit_z_com__abucoins.js';
runScript(path , function(err) {
  if (err) throw err;
  console.log('error in: '+ path );
});

var path = './coins/bch_btc/bit2c_co_il__abucoins.js';
runScript(path , function(err) {
  if (err) throw err;
  console.log('error in: '+ path );
});

//-----------------------------------------------------------------------
//        DASH
//-----------------------------------------------------------------------

var path = './coins/dash_btc/bit_z_com__abucoins.js';
runScript(path, function(err) {
  if (err) throw err;
  console.log('error in: '+ path);
});
//-----------------------------------------------------------------------
//        LTC
//-----------------------------------------------------------------------
var path = './coins/ltc_btc/bit_z_com__abucoins.js';
runScript(path , function(err) {
  if (err) throw err;
  console.log('error in: '+ path );
});

var path = './coins/ltc_btc/bit2c_co_il__bit_z_com.js';
runScript(path , function(err) {
  if (err) throw err;
  console.log('error in: '+ path );
});




var delay_in_milliseconds = 60000;

function run_in_loop_wrapper() {
  var asdf = shell.exec('pgrep -a node | grep coins | cut -c35-100 ', {silent : true}).stdout;
console.log(asdf);
  function send_reality_check() {

  var rp = require('request-promise');
  var options = {
    method: 'POST',
    uri: 'http://manage_arber.local/Api/en/v1/reality_check',
    qs: {data: asdf},
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options).then(function(da) {
     console.log('we have results: '.info, da);
  //  callback(null, da);
  }).catch(function(err) {
     console.log('API call failed...');
    // API call failed...
  });
};
send_reality_check();

  helper_functions.loop_function(run_in_loop_wrapper, delay_in_milliseconds);
}

run_in_loop_wrapper();
