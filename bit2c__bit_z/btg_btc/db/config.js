/**
 * Created by natan on 22/03/17.
 */
function mongodbUrl () {

  var DATABASEUSERNAME = 'rami';
  var DATABASEPASSWORD = 'pifpaf';
  var DATABASEHOST = 'localhost';
  var DATABASEPORT = '27017';
  var DATABASENAME = 'arber';

// :'+DATABASEPASSWORD+'@'+DATABASEHOST+':'DATABASEPORT+'/'+DATABASENAME

  //   return 'mongodb://'+DATABASEUSERNAME+':'+DATABASEPASSWORD+'@'+DATABASEHOST+':'+DATABASEPORT+'/'+DATABASENAME ;
  return 'mongodb://'+DATABASEHOST+':'+DATABASEPORT+'/'+DATABASENAME ;

  //     'mongodb://localhost:27017/chattypro';

}
// console.log(dbUrl());
module.exports =  mongodbUrl();