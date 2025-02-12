const axios = require("axios");

const BookingRepository = require('../repository/booking-repository');

const { ValidationErr, ServiceErr} = require('../utils/Error/index');

const {FLIGHT_PATH_URL} = require("../config/configServer");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

     async createBooking(data) {
        try {
            const flightId = (data.flightId);
            const getFlightRequestURL = `${FLIGHT_PATH_URL}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            let flightPrice = response.data.data.price;
            const TotalSeats = data.NoOfSeats;
            const flightData = response.data.data;

            if (data.NoOfSeats > flightData.totalSeats){
                throw new ServiceErr('something went wrong in the service layer',
                 'insufficient seats',
                 'please check the number of seats available');
            }

            const totalCost = TotalSeats*flightPrice;
            const bookingPayload = {...data, totalCost};
            
            const booking = await this.bookingRepository.createBooking(bookingPayload);

            const flightUpdateURL = `${FLIGHT_PATH_URL}/api/v1/flight/${booking.flightId}`;
            await axios.patch(flightUpdateURL, {totalSeats: flightData.totalSeats - booking.NoOfSeats});

            const finalBookingStatus = await this.bookingRepository.updateBooking(booking.id, {status:'Booked'});
            return finalBookingStatus;

            
        } catch (error) {
            if (error.name == 'Repository Error' || error.name == 'sequelizeValidationError') {
                throw error;
            }

            throw new ServiceErr();
        }
     }
}

module.exports = BookingService;