//later usage of this custom function in our project becuase we get error now from the server to the client if username or email is already taken by someone else
export const errorHandler = (statuscode, message) => { //sir kai code mai errorHandler nhi errorHandler likha hua hai
    const error = new Error(message);
    error.statuscode = statuscode;
    error.message = message;
    return error;
}

//if we have to use it in auth.js file then we have to import it like  import {errorHandler} from '../utils/error.js'; and then we can use it like this next(errorHandler(404,'error created by us (manual error)') ) //404 is the status code and User not found! is the message in the catch block of the auth.controller.js file