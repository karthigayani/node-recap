import { client } from "../index.js";
import { ObjectId } from "mongodb"; // importing ObjectId
export async function updateMovieById(id, data) {
  return await client
    .db("recap")
    .collection("movies")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client
    .db("recap")
    .collection("movies")
    .deleteOne({ _id: new ObjectId(id) });
}
export async function createMovies(data) {
  return await client.db("recap").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
  // console.log("Objectid", id);
  return await client.db("recap").collection("movies").findOne({ _id: new ObjectId(id) });
}
export async function getMovies(request) {
  return await client.db("recap").collection("movies").find(request.query).toArray();
}
