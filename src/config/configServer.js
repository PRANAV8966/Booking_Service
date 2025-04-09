const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_SYNC: process.env.DB_SYNC,
    FLIGHT_PATH_URL: process.env.FLIGHT_PATH_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    USER_PATH_URL: process.env.USER_PATH_URL
}