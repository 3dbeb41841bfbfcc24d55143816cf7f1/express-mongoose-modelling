var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-modeling');

var Passenger = require("./models/passenger");
var Flight    = require("./models/flight");
var Terminal  = require("./models/terminal");
var Airport   = require("./models/airport");


var flight1 = new Flight({
  from:                 "CDG France",
  to:                   "JFK New-York, USA",
  airline:              "American Airline",
  passengers:           []
});

flight1.save();
console.log(flight1)


var flight2 = new Flight({
  from:                 "Heathrow UK",
  to:                   "JFK New-York, USA",
  airline:              "British Airways",
  passengers:           []
});

flight2.save();
console.log(flight2)



var airport1 = new Airport({
    name:           "ATL",
    country:        "USA",
    opened:         ((new Date()).setYear(1990))
  });


airport1.terminals.push({
    name:           "Terminal 1",
    capacity:       234324,
    flights:        [flight1, flight2]
  })
console.log(airport1)
console.log(airport1.terminals)
airport1.save()




// 1. Create a new Flight. We can create it calling Flight.create or through Terminal

/* 2. Create a new Passenger:

var marc = new Passenger({});
marc.first_name, marc.last_name, etc
marc.save()
*/

/* 3. Create a new Flight and add the Passenger to it
flight3 = new Flight({});
flight3.to, flight3.from, flight3.airline
flight3.passengers.push(marc)
flight3.save()

We should now see marc as an embedded document with and ObjectID. We could also add a new passenger using flight3.passenger.push({}) directly without creating a new Passenger using the schema first

Passengers is set up as it's own Collection since a passenger may belong to many flights and a flight has many passengers. However, it may make sense

*/

/* 4. TO POPULATE FLIGHTS ON THE TERMINAL MODEL:

Terminal.findOne({name: "ATL Terminal C"}).populate('flights').exec(function(err, terminal){if (err) console.log(err); console.log(terminal);});

*/

/* 5. To find one airport. Note that the Terminal info gets printed but not the flight info:

Airport.findOne({name: "ATL"}, function(err, airport){if (err) console.log(err); console.log(airport);});

*/
