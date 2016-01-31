var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  species: { type: String, required: true },
  gender:  { type: String, required: true },
  age:     Number,
  owner:   {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

PetSchema.methods.toString = function() {
  return this._id + ': ' + this.name + ' is a ' + this.gender + ' ' +
         this.age + ' year old ' + this.species + ' owned by ' + this.owner;
};

module.exports = mongoose.model('Pet', PetSchema);
