var mongoose = require('mongoose');
var Passenger = mongoose.model('Passenger');

var FlightSchema = new mongoose.Schema({
  from:           	String,
  to:        	  		String,
  airline: 		  		String,
  passengers:     	[Passenger.schema]
});

var Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
