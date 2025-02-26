
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
                'Repository Error',
                'not able to create the booking',
                'Some issue found while creating the booking'
            )
        }
    }

    async updateBooking(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if(data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw {error};
        }
    }

    async findBooking(bookingId) {
        try {
            const bookingdetails = await Booking.findByPk(bookingId);
            console.log(bookingdetails);
            return bookingdetails;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteBooking(bookingId) {
        try {
            await Booking.destroy({
                where: {
                    id:bookingId
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports= BookingRepository;