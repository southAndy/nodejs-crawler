import express from "express"
import fetchData from "./crawler/ntomfa.js";


// import * as dotenv from "dotenv"
// dotenv.config()

let url = 'https://www.ntmofa.gov.tw/activitysoonlist_1036.html'

//產生一個express的web-server
let app = express();
//對應的url
let port = 8700;

//到對應url會觸發行為
app.get('/', function(req, res) {
  fetchData(url)
  res.send('<h3>fetch data ....</h3>');

  
});
app.listen(port,()=>console.log('server running'))
