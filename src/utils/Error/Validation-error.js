const { StatusCodes } = require('http-status-codes');

class ValidationErr extends Error {
    constructor(error) {
        super();
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });

        this.name = error.name;
        this.message = 'Cannot validate the data sent in the request';
        this.explanation = explanation;
        this.StatusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationErr;