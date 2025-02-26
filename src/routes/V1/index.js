const express = require('express');
const router = express.Router();

const BookingController = require('../../controllers/booking-controller');
const bookingController = new BookingController();

router.get('/home', (req, res) => {
    return res.json({
        message:'entered in the booking service'
    })
});
router.post('/booking', bookingController.createBooking);
// router.post('/publish', bookingController.sendMessageToQueue);
router.patch('/cancelBooking/:id', bookingController.cancelBooking);

router.delete('/delete/booking/:id', bookingController.deleteBooking);

module.exports = router;