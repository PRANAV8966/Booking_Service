const { StatusCodes } = require('http-status-codes');

class ServiceErr extends Error {
    constructor(
        message= 'Something went wrong',
        explanation= 'Service layer error',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super();
        this.name = 'ServiceError';
        this.message = message,
        this.explanation = explanation,
        this.StatusCode = statusCode
    }
}

module.exports = ServiceErr; 