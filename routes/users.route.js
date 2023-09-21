import express from "express";
import { createUser, generateHashedPassword, getUserByName } from "../services/users.service.js"; // step:4 import getUserByName
import bcrypt from "bcrypt"; // step:16 importing bcrypt
import jwt from "jsonwebtoken"; // step:19 install and import jsonwebtoken
const router = express.Router();

// signup function
router.post("/signup", async function (request, response) {
    
    const {username, password} = request.body; 

    // const userFromDB = getUserByName(username); // step:1 checking username already exist in DB or not
    const userFromDB = await getUserByName(username); // step:2 creating a function getUserByName -> returns promise -> So it is async function put await.
    // step:3 refer user.service.js
    console.log(userFromDB); // step:5 
    // step:6 pass the username already exist and not exist in db by postman and see the result in terminal.

    // step:7 validate by passing condition
    if (userFromDB){
      // response.send({message: "Username already exist"});
      response
      .status(400)
      .send({message: "Username already exist"}); // You can add status bad request
    } 
    else if(password.length < 8){ // step:8 validating password
      response
      .status(400)
      .send({message: "Password must be at least 8 characters"});
    }
    else {
      const hashedPassword = await generateHashedPassword(password);
      const result = await createUser({
      username : username, 
      password : hashedPassword
    }); 
    response.send(result);
    }
  });

  // Login function
  router.post("/login", async function (request, response) { // step:9 change router link signup -> login 
    const {username, password} = request.body; 
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);

    if (!userFromDB){ // step:10 condition applied (username not present)
      response
      .status(401) // step:12 Unautorized (change 400 -> 401)
      .send({message: "Invalid credentials"}); // Step: 11 When you mention username not exist it is also an information for hackers. 
                                               //So don't mention invalid username or password particularly. Always give general message.
    }
    else{ // step:13 userFromDB present means you have to check password matches or not
      const storedDBPassword = userFromDB.password; // step:14 getting stored password from database 
      const isPasswordCheck = await bcrypt.compare(password, storedDBPassword); // step:15 comparing password with storedDBPassword
      console.log(isPasswordCheck);

      if (isPasswordCheck) { // step:17 isPasswordCheck = true
        const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY); // step:20 Generating token: 1st arg -> unique value, 2nd arg -> secret key
        // step:21 Go to .env file and define SECRET_KEY value.
        // response.send({message: "Successful login"}); 
        response.send({message: "Successful login", token: token}); // Step:22 send token with message.

        // Step: 23 Now run your node app "npm run dev" and go to your postman, in the login link press send.
          // You will get successful login message with token. now copy the token value and pass which are the links you want
          // at the headers by key and value. (Header is the common place for all methods like GET,POST,Delete,PUT)
          // key -> x-auth-token (Industry standard name) and values -> token value.(copy the token value inside the "").
          // Now you can send "x-auth-token" as middleware in the API's.
      }
      else { // step:18 isPasswordCheck = False
        response
        .status(401)
        .send({message: "Invalid credentials"})
      }
    }   
  });
export default router;
























