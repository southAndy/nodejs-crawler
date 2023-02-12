import * as cheerio from "cheerio";
import express from "express"
import axios from "axios"
import * as dotenv from "dotenv"
dotenv.config()



import {fetchData} from "./crawler/ntomfa";

let port = 8700;
// let baseUrl = museumList[0].url
console.log(process.env.USER_ID);
let app = express();



app.get('/', function(req, res) {
  fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))
