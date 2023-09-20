import express from "express";
import { createUser, generateHashedPassword } from "../services/users.service.js"; // step:1 import generateHashedPassword
const router = express.Router();


  router.post("/signup", async function (request, response) {
    // const {data} = request.body; // step:2
    const {username, password} = request.body; // step:2 put {username, password} instead of data.
    // console.log(data);

    
    // const result = await createUser({username, password}); // step:3 put {username, password} instead of data.
    // step:3 But when you send password directly your data can be readed. So if you send hashedPassword your data becomes safe.

    // const hashedPassword = generateHashedPassword(password); // step:4 function call
    const hashedPassword = await generateHashedPassword(password); // step:6 async function call so we put await before
    
    // step:5 Assign username itself username and hashedPassword for password.
    const result = await createUser({
      username : username, 
      password : hashedPassword
    }); // step:5 
    
    response.send(result); // sending response
  });
  
export default router;


