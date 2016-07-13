var Massive = require('massive');
var db = Massive.connectSync({db: 'massive-test'});

var newUser = {
  email: 'test2@test.com',
  first: 'Jill',
  last: 'Test'
};

// db.users.save(newUser, function(err, result) {
//   console.log(result);
// });

db.users.find(1, function(err, res) {
  console.log(res);
});

db.users.find({email: 'test2@test.com'}, function(err, res) {
  console.log(res);
});

// below is a sync func--it can be made async--and usually good to use node's async callback style as sync routines can be blocking; however, for small scripts like this they can be useful.
db.users.saveSync({id: 1, email: 'kara@test.com'});
var kara = db.users.findSync(1);
console.log(kara);

var kara = db.users.saveSync({id: 1, email: 'karaNow@test.com'});
console.log(kara);

db.users.destroy({id: 2}, function(err, res) {
  console.log(res);
});
