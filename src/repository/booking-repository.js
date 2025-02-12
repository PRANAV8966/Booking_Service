
const { Booking } = require('../models/index');
const { ValidationErr, ServerErr} = require('../utils/Error/index');

class BookingRepository {

    async createBooking(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name = 'sequelizeValidationError') {
                throw new ValidationErr();
            }
            throw new ServerErr(
                'Internal server error',
                'not able to create the booking',
                'Some issue found while creating the booking'
            )
        }
    }
}

module.exports= BookingRepository;