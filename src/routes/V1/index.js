const express = require('express');
const router = express.Router();

const bookingController  = require('../../controllers/booking-controller');

router.post('/booking', bookingController.createBooking);

module.exports = router;