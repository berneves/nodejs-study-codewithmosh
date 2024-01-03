const {Movie} = require('../models/movie'); 
const auth = require("../middleware/auth")
const {Customer} = require('../models/customer');
const {Rental, validate} = require('../models/rental');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
        _id: movie._id,
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate
      },
 
  });
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      const result = await rental.save();
      movie.numberInStock--;
      movie.save();
      res.send(result);
    });

    session.endSession();
    console.log('success');
  } catch (error) {
    console.log('error111', error.message);
  }
});

module.exports = router; 