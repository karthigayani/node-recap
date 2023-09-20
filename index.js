// Day-12 connecting node with mongodb

import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js"
dotenv.config();

const app = express();

// const PORT = 4000; // In local server we can set const port value. but when deploying to online you cann't fix the port value
const PORT = process.env.PORT; // Auto assign PORT

// connection
// const MONGO_URL = "mongodb://127.0.0.1"; // local db
// env -> environment variables
//process.env contains all your system variables. So, it contains variable inside .env file too.
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL); // dial // client -> bridge b/w node and mongoDB
await client.connect(); // call
console.log("Mongo is connected !!!"); // This will execute only when the connection is made. If not this will not executed.


//Applying middleware in common place, to avoid repeating it again nd again.
 
app.use(express.json()); // It checks all request which contain body or not. If body present means , it applies the middleware express.json().

app.get("/", function (request, response) {
  response.send("Hello🙋‍♂️, world🌏 🎊✨🤩");
}); 

app.use("/movies",moviesRouter); 

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export {client};