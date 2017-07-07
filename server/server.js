var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require( 'path' );
var port = process.env.PORT || 5000;
var koalaRoute = require ('./routes/koala.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/koalas', koalaRoute);

// Serve back static files by default
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
