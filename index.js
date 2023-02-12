import express from "express"
import fetchData from "./crawler/ntomfa.js";

// import * as dotenv from "dotenv"
// dotenv.config()

//產生一個express的web-server
let app = express();

//對應的url
let port = 8700;

//對應url會觸發行為
app.get('/', function(req, res) {
  fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))
