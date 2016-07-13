var pg = require('pg');
pg.defaults.ssl = true;
var connectionString = 'postgres://offlqpmqxhyutg:oaFSW5OBBnHQkrxVuf6ZU5dNgp@ec2-54-243-55-26.compute-1.amazonaws.com:5432/d23jepi7vhlk8h'
//not sure that is the right local host address, just put my default on in!

var client = new pg.Client(connectionString); //.DocumentRevisions-V100/ create new instance of client to interact with db
client.connect((err) => {
  if (err) throw err;
}); // establish communication between created client and db
// var query = client.query('CREATE TABLE tweets(id SERIAL PRIMARY KEY, text VARCHAR(140) not null, complete BOOLEAN);');  //then run a SQL query to create tweets table via query() method
// query.on('end', function() {client.end(); }); //Communication closed via end() method
client.query('CREATE TABLE tweets(id SERIAL PRIMARY KEY, text VARCHAR(140) not null, complete BOOLEAN);');
