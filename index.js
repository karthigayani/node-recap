// Day-12 connecting node with mongodb

import express from "express";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
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

app.get("/movies", async function (request, response) {
  // request.query returns string value.
  // In our movies collection rating is in number. So if request.query is rating means convert them into number.
  if(request.query.rating){
    request.query.rating = +request.query.rating;
  };
  console.log(request.query);
  // db.movies.find({})

  // cursor - pagination when you search in google, it will show top 10 results only. if you want means you go to next next page.
  // why they don't show all the million results??? why because when you get all the millions of data, browser will strucks to produce results. Also it affects browser database too.
  // To avoid this browser shows top 10 reults. Likewise mongoDB also shows first 20 results. 
  
  // Cursor - pagination | Cursor -> Array | toArray()
  // const movies = await client.db("recap").collection("movies").find({});
  // const movies = await client.db("recap").collection("movies").find({}).toArray();
  
  // query params: in google or any other search bar, when you seach an item you will can notice (For eg: http link + `?search_query=ps2`). here we are filtering an item.
  // const movies = await client.db("recap").collection("movies").find({name:"RRR"}).toArray();
  const movies = await client.db("recap").collection("movies").find(request.query).toArray();
  // console.log(movies);
  response.send(movies);
});

app.get("/movies/:id",async function (request, response) { 
  const {id} = request.params; 
  // console.log(request.params, id); 
  // const movie = movies.find((mv) => mv.id == id); // using local data
  // getting data from database
  // db.movies.findOne({id:'100'}) -> db query
  const movie = await client.db("recap").collection("movies").findOne({id: id});

  console.log(movie);
 
  movie ? response.send(movie) : response.status(404).send({message: "movie not found"});

}); 
 
app.post("/movies", async function (request, response) {
  // middleware -> applied in the middle of API and async function
      // node does not know whether our sending data is XML/JSON/Text.
      // express.json() -> inbuilt middleware in express -> which confirms our sending data in JSON and converts it into JS object
      // API data -> express.json()(JSON->JS Object) -> async function uses the JS Object and produces the result.
  // app.post("/movies", express.json(), async function (request, response) {
  const data = request.body;
  console.log(data);
  // db.movies.insertMany(data)
  const result = await client.db("recap").collection("movies").insertMany(data);

  response.send(result);
});

app.delete("/movies/:id",async function (request, response) { 
  const {id} = request.params; 
  
  // db.movies.deleteOne({id:'100'}) -> db query
  const result = await client
  .db("recap")
  .collection("movies")
  .deleteOne({id: id});

  console.log(result);
  result.deletedCount 
  ? response.send({message:"movie deleted successfully"}) 
  : response.status(404).send({message: "movie not found"});

}); 

app.put("/movies/:id",async function (request, response) { 
  const {id} = request.params; 
  const data = request.body;
  // db.movies.updateOne({id:'100'},{$set:{rating:9}}) -> db query
  const result = await client
  .db("recap")
  .collection("movies")
  .updateOne({id: id},{$set:data});

  console.log(result);
  response.send(result); 
  
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

