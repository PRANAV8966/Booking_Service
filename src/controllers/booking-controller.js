const BookingService = require('../Services/booking-service');

const { createChannel, publishMessage } = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require("../config/configServer");

const { StatusCodes } = require('http-status-codes');


class BookingController {
    constructor() {
        this.bookingService = new BookingService();
        this.createBooking = this.createBooking.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    async #sendMessageToQueue(message) {
        try {
            const channel = await createChannel();
            await publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(message));
            return res.status(200).json({
                message:'successfully published the message',
                error:{}
            });
            
        } catch (error) {
            console.log('something went wrong while queueing messages');
            throw error;
        }
    }

    async createBooking(req, res) {
        try {
            const flight = await this.bookingService.createBooking(req.body);
            return res.status(200).json({
                data:flight,
                message:'successsfully fetched the flights',
                error:{},
                success : true
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                data:{},
                message:'failed to fetch flights',
                error:error,
                success:false
            })
        }
    }

    async cancelBooking (req, res) {
        try {
            const cancelledBooking = await this.bookingService.cancelBooking(req.params.id);
            return res.status(200).json({
                response: cancelledBooking,
                success:true,
                message:'successfully cancelled the booking, **refund Initiated**',
                error:{}
            });
        } catch (error) {
            return res.status(500).json({
                response:{},
                success:false,
                message:'error while cancelling the ticket',
                error:error
            });
        }
    }

    async deleteBooking(req, res) {
        try {
            const response = await this.bookingService.deleteBooking(req.params.id);
            return res.status(StatusCodes.OK).json({
                success:response,
                message:'successfully deleted the booking',
                error:{}
            });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success:false,
                message:'unable to  deleted the booking',
                error:error
            })
        }
    }
}


module.exports = BookingController;