import express from "express";
import { createUser, generateHashedPassword, getUserByName } from "../services/users.service.js"; // step:4 import getUserByName
const router = express.Router();
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
export default router;
























