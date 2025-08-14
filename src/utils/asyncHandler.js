//! promises wrapper

const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}

export {asyncHandler}




// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

//* A higher order function
/**
 * The asyncHandler function is a higher-order function that takes in another function as an argument
 * and returns an async function.
 * @param fn - The `fn` parameter in the `asyncHandler` function is a callback function that will be
 * executed asynchronously.
 */

//! try-catch wrapper
/*
const asyncHandler = (fn) => async(req,res,next) =>  { // next for middleware
    try {
        await fn(req, res, next) // execute the base function
    } catch (error) {
        //* error.code passed by user if not 500
        res.status(error.code || 500).json({ 
            success: false,  // success flag in json response: easy for frontend
            messsage: error.messsage
        })
    }
}
*/    
//note: we are just attaching a wrapper of try catch and async to functions