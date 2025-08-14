/*
standardise api error and response
read nodejs api error
inherit and overwrite methods of node error class
*/

class ApiError extends Error {
    // making own constructor to overwrite default constructor of Error class
    constructor( 
        // parameteres in constructor must be passed for object to be made(compulsory)
        statusCode, 
        message = "something went wrong", // default arguments: msg is bad
        errors = [], // array of error if pass multiple errors
        stack = "" // error stack
    ){
        //* over-writing
        super(message) // calls parent class constructor
        this.statusCode = statusCode
        this.data = null //todo: read about it
        this.message = message
        this.success = false // we are handling api errors not response , so we wont need to send success flag
        this.errors = errors

        //* production grade below
        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}

//! now we want all errors to pass through this file. Add middleware