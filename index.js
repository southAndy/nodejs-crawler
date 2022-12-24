import * as cheerio from "cheerio";
import express from "express"
import axios from "axios"

import getNtomfaInfo from "./crawler/ntomfa";

let port = 8700;
let baseUrl = museumList[0].url
let app = express();



app.get('/', function(req, res) {
  getNtomfaInfo()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))