var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:3000';
//not sure that is the right local host address, just put my default on in!

var client = new pg.Client(connectionString); //.DocumentRevisions-V100/ create new instance of client to interact with db
client.connect(); // establish communication between created client and db
var query = client.query('CREATE TABLE tweets(id SERIAL PRIMARY KEY, text VARCHAR(140) not null, complete BOOLEAN)');  //then run a SQL query to create tweets table via query() method
query.on('end', function() {client.end(); }); //Communication closed via end() method
