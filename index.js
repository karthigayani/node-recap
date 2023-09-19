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

// const movies = [
//   {
//   "id": "99",
//   "name": "Vikram",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMmJhYTYxMGEtNjQ5NS00MWZiLWEwN2ItYjJmMWE2YTU1YWYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
//   "rating": 8.4,
//   "summary": "Members of a black ops team must track and eliminate a gang of masked murderers.",
//   "trailer": "https://www.youtube.com/embed/OKBMCL-frPU"
//   },
//   {
//   "id": "100",
//   "name": "RRR",
//   "poster": "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
//   "rating": 8.8,
//   "summary": "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
//   "trailer": "https://www.youtube.com/embed/f_vbAtFSEc0"
//   },
//   {
//   "id": "101",
//   "name": "Iron man 2",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//   "rating": 7,
//   "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//   "trailer": "https://www.youtube.com/embed/wKtcmiifycU"
//   },
//   {
//   "id": "102",
//   "name": "No Country for Old Men",
//   "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//   "rating": 8.1,
//   "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//   "trailer": "https://www.youtube.com/embed/38A__WT3-o0"
//   },
//   {
//   "id": "103",
//   "name": "Jai Bhim",
//   "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//   "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//   "rating": 8.8,
//   "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA"
//   },
//   {
//   "id": "104",
//   "name": "The Avengers",
//   "rating": 8,
//   "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
//   "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//   "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8"
//   },
//   {
//   "id": "105",
//   "name": "Interstellar",
//   "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//   "rating": 8.6,
//   "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//   "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E"
//   },
//   {
//   "id": "106",
//   "name": "Baahubali",
//   "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//   "rating": 8,
//   "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//   "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI"
//   },
//   {
//   "id": "107",
//   "name": "Ratatouille",
//   "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
//   "rating": 8,
//   "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
//   "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w"
//   },
//   {
//   "name": "PS2",
//   "poster": "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyNDExMjcyMzA@._V1_.jpg",
//   "summary": "Ponniyin Selvan: I is an upcoming Indian Tamil-language epic period action film directed by Mani Ratnam, who co-wrote it with Elango Kumaravel and B. Jeyamohan",
//   "rating": 8,
//   "trailer": "https://www.youtube.com/embed/KsH2LA8pCjo",
//   "id": "108"
//   },
//   {
//   "name": "Thor: Ragnarok",
//   "poster": "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_.jpg",
//   "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\\n of researchers, to find a new planet for humans.",
//   "rating": 8.8,
//   "trailer": "https://youtu.be/NgsQ8mVkN8w",
//   "id": "109"
//   }
//   ]

//Applying middleware in common place, to avoid repeating it again nd again.
 
app.use(express.json()); // It checks all request which contain body or not. If body present means , it applies the middleware express.json().

app.get("/", function (request, response) {
  response.send("Hello🙋‍♂️, world🌏 🎊✨🤩!!!");
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

