import express from "express";
const router = express.Router();
import { getMovies, getMovieById, createMovies, deleteMovieById, updateMovieById } from "../services/movies.service.js";
import { auth } from "../middleware/auth.js"; // step:29 importing auth middleware

  // router.get("/", async function (request, response) { 
  router.get("/", auth, async function (request, response) { // step:28 passing auth middleware
    
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
    const movies = await getMovies(request);
    // console.log(movies);
    response.send(movies);
  });
  
  // router.get("/:id",async function (request, response) { 
  router.get("/:id", auth, async function (request, response) { // step:35 passing auth middleware
    const {id} = request.params; 
    // console.log(request.params, id); 
    // const movie = movies.find((mv) => mv.id == id); // using local data
    // getting data from database
    // db.movies.findOne({id:'100'}) -> db query
    const movie = await getMovieById(id);
  
    console.log(movie);
   
    movie ? response.send(movie) : response.status(404).send({message: "movie not found"});
  
  }); 
   
  // router.post("/", async function (request, response) {
  router.post("/", auth, async function (request, response) { // step:35 passing auth middleware
    // middleware -> applied in the middle of API and async function
        // node does not know whether our sending data is XML/JSON/Text.
        // express.json() -> inbuilt middleware in express -> which confirms our sending data in JSON and converts it into JS object
        // API data -> express.json()(JSON->JS Object) -> async function uses the JS Object and produces the result.
    // app.post("/movies", express.json(), async function (request, response) {
    const data = request.body;
    console.log(data);
    // db.movies.insertMany(data)
    const result = await createMovies(data);
  
    response.send(result);
  });
  
  // router.delete("/:id",async function (request, response) { 
  router.delete("/:id", auth, async function (request, response) { // step:35 passing auth middleware
    const {id} = request.params; 
    
    // db.movies.deleteOne({id:'100'}) -> db query
    const result = await deleteMovieById(id);
  
    console.log(result);
    result.deletedCount 
    ? response.send({message:"movie deleted successfully"}) 
    : response.status(404).send({message: "movie not found"});
  
  }); 
  
  // router.put("/:id",async function (request, response) {
  router.put("/:id", auth, async function (request, response) { // step:35 passing auth middleware
    const {id} = request.params; 
    const data = request.body;
    // db.movies.updateOne({id:'100'},{$set:{rating:9}}) -> db query
    const result = await updateMovieById(id, data);
  
    console.log(result);
    response.send(result); 
    
  });

export default router;


