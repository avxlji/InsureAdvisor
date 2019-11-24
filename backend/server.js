var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  cors = require('cors')
  mongoose = require('mongoose'),
  User = require('./api/Model.js'), // Created model loading here
  bodyParser = require('body-parser');
  
// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0-cn8wj.gcp.mongodb.net/test?retryWrites=true&w=majority', { 
	useNewUrlParser: true,
	useUnifiedTopology: true 
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors()); // Allow cors requests

var routes = require('./api/Routes.js'); // Importing route
routes(app); // Register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);