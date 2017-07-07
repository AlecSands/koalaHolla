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
