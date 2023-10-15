// custom middleware
// This auth.js checks the token valid or not.

import jwt from "jsonwebtoken"; // step:32 importing jwt.

// const auth = (request, response, next){     //step:24 creating auth middleware
export const auth = (request, response, next) => {     //step:26 export auth
    try { // step: 33 Handelling error using try catch method.
        const token = request.header("x-auth-token"); // step:25 extracting token. token is in header (header is in request )
        console.log("token", token); // step:27
        // step:28 refer movies.route.js
        // step:29 refer movies.route.js
        jwt.verify(token, process.env.SECRET_KEY); // step:31 verifying token using jwt package.
        next(); // step:30 calling next. // Purpose of next => It is used to call the next function
    } catch (err) { // step: 33 Handelling error using try catch method.
        response.status(401).send({ message: err.message }); // step:34 error message
    }
};