import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function generateHashedPassword(password){
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashedPassword);
  return hashedPassword;
}

export async function createUser(data) {
  return await client.db("recap").collection("users").insertOne(data); //insertOne -> when signup you can send one user data only
}

// step:3 copy the getMovieById function template from movies.service.js and make edit for user
export async function getUserByName(username){ 
  return await client
  .db("recap")
  .collection("users")
  .findOne({ username: username }); 
}