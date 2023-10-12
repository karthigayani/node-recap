// This auth.js checks the token valid or not.

// const auth = (request, response, next){     //step:24 creating auth middleware
export const auth = (request, response, next) => {     //step:26 export auth
    const token = request.header("x-auth-token"); // step:25 extracting token. token is in header (header is in request )
    console.log("token", token); // step:27
    // step:28 refer movies.route.js
    // step:29 refer movies.route.js
    next(); // step:30 calling next. // Purpose of next => It is used to call the next function
};