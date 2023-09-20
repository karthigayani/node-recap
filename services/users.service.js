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

// generateHashedPassword("password@123");


export async function createUser(data) {
  return await client.db("recap").collection("users").insertOne(data); //insertOne -> when signup you can send one user data only
}