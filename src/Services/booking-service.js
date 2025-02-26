const axios = require("axios");

const BookingRepository = require('../repository/booking-repository');

const { ServiceErr } = require('../utils/Error/index');

const {FLIGHT_PATH_URL} = require("../config/configServer");


class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

     async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_PATH_URL}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestURL);
            let flightPrice = response.data.data.price;
            const TotalSeats = data.NoOfSeats;
            const flightData = response.data.data;

            if (data.NoOfSeats > flightData.totalSeats){
                throw new ServiceErr(
                 'something went wrong in the service layer',
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

     async cancelBooking(id) {
        try {
            // fetching booking details
            const bookingDetails = await this.bookingRepository.findBooking(id);

            // fetching flight details
            const getFlightRequestURL = `${FLIGHT_PATH_URL}/api/v1/flight/${bookingDetails.flightId}`;
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;

            // updating the flight details 
            const flightUpdateURL = `${FLIGHT_PATH_URL}/api/v1/flight/${bookingDetails.flightId}`;
            await axios.patch(flightUpdateURL, {totalSeats: flightData.totalSeats + bookingDetails.NoOfSeats});

            // updating the cancellation status
            const bookingStatus = await this.bookingRepository.updateBooking(bookingDetails.id, {status: 'Cancelled'});
            return bookingStatus;

        } catch (error) {
            throw {error:'error while cancelling the booking, please try again later'};
        }
     }

     async deleteBooking(bookingId) {
        try {
            await this.bookingRepository.deleteBooking(bookingId);
            return true;
        } catch (error) {
            throw {error:'unable to delete the booking'};
        }
     }
}

module.exports = BookingService;