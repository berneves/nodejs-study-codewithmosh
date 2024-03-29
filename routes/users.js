const _ = require('lodash');
const auth = require("../middleware/auth")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.get('/', async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({email: req.body.email});
  if (user) return res.status(400).send("user already there");

  user = new User({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["_id", 'name', 'email']));
});

module.exports = router; 