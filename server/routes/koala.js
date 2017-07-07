var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'antares',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'SELECT * FROM "koalaholla" ORDER BY "name" DESC;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.send({koalas: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
}); // end of GET

router.post('/', function(req, res) {
  var koalaholla = req.body;
  console.log(koalaholla);
  // PASTED PG CODE
  // errorConnecting is bool, db is what we query against,
  // done is a function that we call when we're done
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'INSERT INTO "koalaholla" ("name", "gender", "age", "ready_for_transfer", "notes")' +
                      ' VALUES ($1, $2, $3, $4, $5);';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [koalaholla.name, koalaholla.gender, koalaholla.age, koalaholla.readyForTransfer, koalaholla.notes], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log(errorMakingQuery);
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});

router.put('/', function(req, res){
  var koala = req.body; // Koala with updated content
  console.log('Put route called with koala of ', koala);

  // YOUR CODE HERE
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      console.log(koala);
      // We connected to the database!!!
      // Now we're going to GET things from the db
      var queryText = 'UPDATE "koalaholla" SET "ready_for_transfer" = $1 WHERE id = $2;';
      // errorMakingQuery is a bool, result is an object
      db.query(queryText, [koala.readyForTransfer, koala.id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          // console.log(result);
          // Send back the results
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
});



module.exports = router;
