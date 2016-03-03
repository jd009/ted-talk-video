var express = require('express');
var Path = require('path');
var routes = express.Router();


// Route to the client files
var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));

var app = express();

// Mount our main router
app.use('/', routes);

// Start the server!
var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on port", port);
