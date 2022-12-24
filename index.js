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
    try{
          let response = await axios.get(baseUrl)
          let $ = cheerio.load(response.data)          
          let targetLinks = $('#exhibition-list').find('a')
          let exhibitionList = targetLinks.map((i,el)=>{
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
            //todo 回傳資料格式參考公開api
            console.log(el.attribs.href);
            return {
            title:el.attribs.title,
            //! 如何分類
            type:null,
            showUnit:null,
            descriptionFilterHtml:null,
            startDate: null,
            endDate: null,
            showInfo:[
              {
                //經緯度 for map
                latitude: null,
                longitude: null,
                //展覽是否有售票
                onSale:null,
                //票價
                price:null,
                exhibitionInfo:el.attribs.href
              }
            ],
            imageUrl:null,
            hitRate:null,
    }
          })
          //? 根據不同展覽去loop取得對應資料
          for(let loopTimes = 0;loopTimes<exhibitionList.length;loopTimes++){
              let response = await axios.get(exhibitionList[loopTimes].showInfo[0].exhibitionInfo);
              let exhibitionIntro = cheerio.load(response.data);
              //抓展覽時間
              exhibitionList[loopTimes].startDate = exhibitionIntro('.t_r').text()
              //展覽內容
              let exhibitionContent = exhibitionIntro('div.ckEdit').find('p')
              console.log(exhibitionContent);
              //todo 如何抓到這些p架構的內容
          }
          console.log('最終結果',exhibitionList[0]);
          
    }catch(error){
        console.log('loading',error.message);
    }
}
  let x = fetchData()
  res.send('hello world');

  
});
app.listen(port,()=>console.log('server running'))