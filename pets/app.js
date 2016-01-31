var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var db = require('./db');
var Pet = require('./pet');
var User = require('./user');

// Connect to the database
// To connect use the following:
//   mongoose.connect('mongodb://username:password@localhost:27027/dbname');
// where the username, password, and port are all optional
mongoose.connect('mongodb://localhost/pets');

// our app will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('Removing any old pets...');
Pet.remove({})
.then(function() {
  console.log('Pets removed.');
  console.log('Removing any old users...');
  return User.remove({});
})
.then(function() {
  console.log('Creating some new users...');
  var users = [
    { name: 'Mike Hopper',   phone: '770-456-7890' },
    { name: 'Shawn Johnson', phone: '404-121-2222' },
    { name: 'Marc Wright',   phone: '205-456-1234' }
  ];
  return User.create(users);
})
.then(function(savedUsers) {
  console.log('Finished creating users');
  console.log('Creating some pets...');
  var miko = new Pet({
    name: 'Miko',
    species: 'Dog',
    gender: 'Male',
    age: 3
  });
  var meisha = new Pet({
    name: 'Meisha',
    species: 'Dog',
    gender: 'Female',
    age: 2
  });
  // RETURN AN ARRAY OF PROMISES TO DO PARALLEL EXECUTION (WORKS WITH BLUEBIRD)
  return [
    Pet.create([miko, meisha]),
    User.findOne({ name: 'Mike Hopper' })
  ];
})
// USE BLUEBIRD'S spread FUNCTION TO HANDLE THE ARRAY OF RESOLVED PROMISES
.spread(function(savedPets, mikeHopper) {
  savedPets.forEach(function(pet) {
    mikeHopper.pets.push(pet);
  });
  return mikeHopper.save();
})
.then(function(savedUser) {
  console.log('saved user:', savedUser.toString());
  console.log(savedUser.pets);
  console.log('finding all pets...');
  return Pet.find({});
})
.then(function(pets) {
  console.log('Printing pets:');
  pets.forEach(function(pet) {
    console.log(pet);
  });
  // FIRST LET'S find THE USER WITHOUT THE populate FOR THE PETS
  return User.find({ name: 'Mike Hopper' });
})
.then(function(mikeHopper) {
  console.log('\nmikeHopper (no call to populate):', JSON.stringify(mikeHopper));
  // NOW LET'S USE populate TO GET THE pets DOCS FOR THE USER
  return User.find({ name: 'Mike Hopper' }).populate('pets');
})
// THE LAST then TAKES 2 FUNCTIONS, THE 2ND BEING THE ERROR HANDLER
.then(function(mikeHopper) {
  console.log('\nmikeHopper (with call to populate):', JSON.stringify(mikeHopper));
  quit();
}, function(err) {
  return handleError(err);
});
