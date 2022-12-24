import * as cheerio from "cheerio";
import express from "express"
import axios from "axios"

let museumList = [{
  name:'國美館',url:"https://www.ntmofa.gov.tw/activitysoonlist_1036.html"
}]

let port = 8700;
let baseUrl = museumList[0].url
let app = express();



app.get('/', function(req, res) {
  const fetchData = async ()=>{
    //? 展覽的資料格式 －－參考公開資料
    let exhibitionInfo = {
      //名稱
      title:null,
      showUnit:null,
      descriptionFilterHtml:null,
      startDate: "2022/12/15",
      endDate: null,
      showInfo:[
        {
          //經緯度 for map
          latitude: "24.157234",
          longitude: "120.66606",
          //展覽是否有售票
          onSale:'Y',
          //票價
          price:''
        }
      ],
      imageUrl:[],
      hitRate:1955,
    }
    
    try{
          let response = await axios.get(baseUrl)
          let $ = cheerio.load(response.data)          
          let targetLinks = $('#exhibition-list').find('a')
          console.log(target.length);
          targetLinks.map((i,el)=>{
            console.log(el);
          })
          
    }catch(error){
        console.log('loading',error.message);
    }
}
  let x = fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))