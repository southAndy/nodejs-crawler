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
          let nameList = targetLinks.map((i,el)=>{

            //todo 1.先爬完當頁的：展覽標題 / 展覽圖檔 / 展覽日期
            //todo 2.如果有<a>存在，再發一次request 進去撈更多資料
            //檢測內部架構:
                    //parent
                    // prev
                    // next
                    // startIndex
                    // endIndex
                    // children
                    // name
                    // attribs
                    // type
                    // namespace
                    // x-attribsNamespace
                    // x-attribsPrefix

            for(let property in el){
              // console.log(property);
            }
            //取得對應資料的名稱
            console.log(el.prev);
            //todo 回傳資料格式參考公開api
            return el.attribs.title
          })
          
    }catch(error){
        console.log('loading',error.message);
    }
}
  let x = fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))