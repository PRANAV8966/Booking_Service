const { StatusCodes } = require("http-status-codes");

class ServerErr extends Error {
    constructor( 
        name,
        message, 
        explanation,
        statusCode
    ) {
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation,
        this.StatusCode = statusCode
    }
}

module.exports = ServerErr;