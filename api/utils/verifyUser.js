//here we are verifying user before updating its information in user.controller.js with the help of cookie genererated during sign in
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next(); //if the token is verified then we will move to the next function ie the updateUser function in the user.controller.js file
    });

     
}