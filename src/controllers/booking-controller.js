const BookingService = require('../Services/booking-service');

const BookingController = new BookingService();

const createBooking = async (req, res) => {
    try {
        const flight = await BookingController.createBooking(req.body);
        return res.status(200).json({
            data:flight,
            message:'successsfully fetched the flights',
            error:{},
            success : true
        })
    } catch (error) {
        console.log("something went wrong in the controller layer", error);
        throw error;
    }
}

module.exports = {
    createBooking
}