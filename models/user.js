const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');

const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function(){
  return jwt.sign({_id: this._id, isAdmin: this.isAdmin},config.get("jwtPrivateKey"));
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required()
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;