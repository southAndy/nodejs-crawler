import * as cheerio from "cheerio";
import express from "express"
import axios from "axios"

let port = 8700;
// let targetUrl = 'https://www.tfam.museum/Exhibition/Exhibition_Special.aspx?id=714&ddlLang=zh-tw'
let targetUrl = 'https://www.tnam.museum/exhibition/detail/353'
let app = express();



app.get('/', function(req, res) {
  res.send('hello world');
  const fetchData = async ()=>{
    try{
        let response = await axios.get(targetUrl)
        let $ = cheerio.load(response.data)
        //特定DOM's text
        // console.log($('.info-content').text());
        console.log($('.info-content').attr());
        $('.galleryItem').attr()
    }catch(error){
        console.log('loading');
    }
}
  fetchData()

  
});
app.listen(port,()=>console.log('server running'))