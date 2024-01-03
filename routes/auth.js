const Joi = require('joi');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/user'); 
const mongoose = require('mongoose');
const express = require('express');
const jwt = require("jsonwebtoken")
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send("invalid email or password");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid email or password");
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).required().email(),
      password: Joi.string().min(5).required()
    });
  
    return schema.validate(req);
  }

module.exports = router; 