var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  phone:   { type: String },
  pets:    [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Pet'
           }]
});

UserSchema.methods.toString = function() {
  return this.name + ' : ' + this.phone + ' has ' + this.pets.length + ' pet(s).';
}

module.exports = mongoose.model('User', UserSchema);
