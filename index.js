import * as cheerio from "cheerio";
import express from "express"
import axios from "axios"

let port = 8700;
let baseUrl = 'https://www.tfam.museum/Exhibition/Exhibition.aspx?ddlLang=zh-tw'
let app = express();



app.get('/', function(req, res) {
  const fetchData = async ()=>{
    //存資料的db
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
          
          //todo 用find('.text') 產生
          console.log(123,$('.Exhibition_list').length);
          // const listArr = $('#ExList').find('.Exhibition_list');
          // listArr.map((i,el)=>{
          //   console.log(123,i,el);
          // })
    }catch(error){
        console.log('loading',error.message);
    }
}
  let x = fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))