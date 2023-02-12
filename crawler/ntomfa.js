import axios from "axios"
import * as cheerio from "cheerio";

const fetchData = async (url)=>{
    try{
          //偽裝客戶端發請求
          let response = await axios.get(url)
          //利用這個請求的內容，透過.load()產生一個cheerio實例
          let $ = cheerio.load(response.data)
          let targetLinks = $('#exhibition-list').find('a')
          console.log('展覽超連結數量',targetLinks.length);
          let exhibitionList = targetLinks.map((i,el)=>{
            for(let property in el){
              // console.log(property);
            }
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
          //todo 解決 request太多 造成ECONNRESET 的問題
          for(let loopTimes = 0;loopTimes<exhibitionList.length;loopTimes++){
              let response = await axios.get(exhibitionList[loopTimes].showInfo[0].exhibitionInfo);
              let exhibitionIntro = cheerio.load(response.data);
              //? 抓展覽時間
              exhibitionList[loopTimes].startDate = exhibitionIntro('.t_r').text()
              //? 展覽內容
              let exhibitionContent = exhibitionIntro('div.ckEdit').find('p')
              console.log(exhibitionContent.text());
              exhibitionList[loopTimes].descriptionFilterHtml = exhibitionContent.text()
          }
          console.log('最終結果',exhibitionList);
          
    }catch(error){
        console.log('loading',error.message);
    }
}

export default fetchData